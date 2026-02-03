!function(w) {
    var netIDSDK = {
      tappId : w.netIDTappId,
      isInitialized: false,
      storageprefix: 'ucnid_',
      denyMutePeriod: (w.ucenidDenyMutePeriod ? w.ucenidDenyMutePeriod : 7),
      debug : (w.ucenidDebug ? w.ucenidDebug : 0),
      userData: null,
      writeBuffer: null,
      writePbVar: (w.ucenidWritePbVar ? w.ucenidWritePbVar : false),


    log: function(){
          if(w.netIDSDK.debug){
              console.log.apply(console, arguments);
          }
      },

    getTimestamp: function() {
        var timestamp = Date.now();
        return(timestamp);
      },
    getDate: function() {
        var today = new Date();
        return(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
      },
    readStore: function(key) {
        if(w.localStorage){
            return w.localStorage.getItem(w.netIDSDK.storageprefix+key);
        }
        else {
          return null;
        }

      },
    writeStore: function(key, value) {
        if(w.localStorage){
            w.localStorage.setItem(w.netIDSDK.storageprefix+key, value);
        }
      },


    getNetIdPermissions:  function() {
      var req = new XMLHttpRequest;
      req.open("GET", "https://einwilligungsspeicher.netid.de/netid-user-status?q.tapp_id.eq=" + this.tappId + '&q.identifier.in=TPID,SYNC_ID,ETPID'),      
      req.setRequestHeader("accept", "application/vnd.netid.permission-center.netid-user-status-v2+json"),
      req.addEventListener("load", function() {

        var response = JSON.parse(this.responseText || "{}");
        w.netIDSDK.log("netID response:" + this.responseText);
        w.netIDSDK.log("HTTP status code: " + this.status + ", netID status code: " + response.status_code);
        w.netIDSDK.writeStore('cdate',w.netIDSDK.getDate());
        w.netIDSDK.userData = response;
        if(response.status_code) {
          //Call successful
          if(response.status_code == 'PERMISSIONS_FOUND') {
            // TODO: check id consent
            w.netIDSDK.log("case: Call successful");
            w.netIDSDK.writeStore('tpid',response.subject_identifiers.tpid || null);
            w.netIDSDK.writeStore('etpid',response.subject_identifiers.etpid || null);
            if(w.netIDSDK.writePbVar === true && w.localStorage) {               
                    w.localStorage.setItem('netid_utiq_adtechpass', response.subject_identifiers.etpid);                
            }           
            w.dispatchEvent(new CustomEvent("UC_NETID_TPIDUPDATE", { detail: {tpid:response.subject_identifiers.tpid,etpid:response.subject_identifiers.etpid }}));


            let idConsent = response.netid_privacy_settings.idconsent.status || null;
            if(idConsent === 'INVALID' && (w.netIDSDK.readStore('deny') !== 'true' || (w.netIDSDK.readStore('deny') === 'true' && !w.netIDSDK.isDenyMuteActive()))) {
              w.netIDSDK.log("idconsent status is invalid - deny period expired - showing netid layer");
              w.netIDSDK.showConsentLayer();
            }
            let iabTcString = response.netid_privacy_settings.iab_tcstring.value || null;
            if(iabTcString && w.UC_UI && typeof(w.UC_UI.injectTCString) === 'function') {

              if(w.netIDSDK.writeBuffer) {                    
                  w.netIDSDK.writeNetIdPermissions((idConsent==='VALID')?true:false);
              }
              else {
                w.__tcfapi('getTCData', 2, async function(tcData, success) {
                  if(success) {
                    if(tcData && tcData.tcString != undefined) {
                      if(iabTcString != tcData.tcString) {
                        w.netIDSDK.log("injecting tcString from netId.");
                        var iResp = await w.UC_UI.injectTCString(iabTcString);
                        if(iResp) {
                          w.netIDSDK.log("succesfully injected");
                        }
                        else {
                          w.netIDSDK.log("omitting as netid tcString is not newer than local tcString");
                        }
                      }
                      else {
                        w.netIDSDK.log("omitting as netid tcString is identical to local tcString");
                      }
                    }
                  }
                });
              }

            }

          }         
          else if(response.status_code == 'NO_TPID') {
            w.netIDSDK.log("case: No tpid_sec cookie in request available.");
            w.netIDSDK.writeStore('tpid','NO_TPID');
            w.dispatchEvent(new CustomEvent("UC_NETID_TPIDUPDATE", { detail: {tpid:'NO_TPID'}}));
          }
          else if(response.status_code == 'NO_TAPP_ID') {
            w.netIDSDK.log("case: No tpid_sec cookie in request available.");
          }
          else if(response.status_code == 'TOKEN_ERROR') {
            w.netIDSDK.log("case: Token (JWT) in the cookie is expired or invalid.");
          }
          else if(response.status_code == 'TAPP_ERROR') {
            w.netIDSDK.log("case: TAPP tapp_id is invalid.");
          }
          else if(response.status_code == 'PERMISSIONS_NOT_FOUND') {
            w.netIDSDK.log("case: Permissions for tpid not found.");
            w.netIDSDK.writeStore('tpid','PERMISSIONS_NOT_FOUND');
            w.dispatchEvent(new CustomEvent("UC_NETID_TPIDUPDATE", { detail: {tpid:'PERMISSIONS_NOT_FOUND'}}));
            if(response.status_code == 'PERMISSIONS_NOT_FOUND' && (w.netIDSDK.readStore('deny') !== 'true' || (w.netIDSDK.readStore('deny') === 'true' && !w.netIDSDK.isDenyMuteActive()))) {
              w.netIDSDK.showConsentLayer();
            }
          }
          else if(response.status_code == 'TAPP_NOT_ALLOWED') {
            w.netIDSDK.log("case: TAPP tapp_id is not allowed.");
          }
          else if(response.status_code == 'TPID_EXISTENCE_ERROR') {
            w.netIDSDK.log("case: Account does not exist anymore.");
          }          

        }
        else {
          //TODO: catch this
        }

      }),
      req.withCredentials = !0,
      req.send()
  },



      writeNetIdPermissions: function(identification=null) {

          if(w.__tcfapi && typeof w.__tcfapi === 'function') {
            w.__tcfapi('getTCData', 2, function(tcData, success) {
              if(success) {
                if(tcData && tcData.tcString) {
                  var tcStringToSend = tcData.tcString;
                  if(w.UC_UI && typeof(w.UC_UI.getTCFDisclosedVendorsSegmentString) === 'function') {
                    tcStringToSend = tcStringToSend +'.'+w.UC_UI.getTCFDisclosedVendorsSegmentString();
                  }
                  var data = {
                      iab_tc_string: tcStringToSend
                  };
                  if(identification && identification != null && identification === true) {
                    data.idconsent = 'VALID';
                  }
                  else {
                    data.idconsent = 'INVALID';
                  }
                  req = new XMLHttpRequest;
                  req.open("POST", "https://einwilligen.netid.de/netid-permissions?q.tapp_id.eq=" + w.netIDSDK.tappId+'&q.identifier.in=TPID,SYNC_ID,ETPID'),                  
                  req.addEventListener("load", function() {
                      var response = JSON.parse(req.responseText);
                      w.netIDSDK.userData = response;
                      w.netIDSDK.log("writeNetIdPermissions response",response);
                      w.netIDSDK.writeStore('tpid',response.subject_identifiers.tpid || null);
                      w.netIDSDK.writeStore('etpid',response.subject_identifiers.etpid || null);    
                      if(w.netIDSDK.writePbVar === true && w.localStorage) {               
                        w.localStorage.setItem('netid_utiq_adtechpass', response.subject_identifiers.etpid);                
                      }         
                      w.dispatchEvent(new CustomEvent("UC_NETID_TPIDUPDATE", { detail: {tpid:response.subject_identifiers.tpid,etpid:response.subject_identifiers.etpid }}));

                  }),
                  req.addEventListener("error", function() {
                        w.netIDSDK.log("writeNetIdPermissions error");
                  }),
                  req.setRequestHeader("Content-type", "application/vnd.netid.permission-center.netid-permissions-v2+json"),
                  req.setRequestHeader("accept", "application/vnd.netid.permission-center.netid-subject-status-v2+json"),
                  req.withCredentials = !0,
                  req.send(JSON.stringify(data))
                }

              }
            }
            );
          }
          else {
            var data = {
                identification: identification
            };
            req = new XMLHttpRequest;
            req.open("POST", "https://einwilligen.netid.de/netid-permissions?q.tapp_id.eq=" + w.netIDSDK.tappId+'&q.identifier.in=TPID,SYNC_ID,ETPID'),  
            req.addEventListener("load", function() {
                var response = JSON.parse(req.responseText);
                this.userData = response;
                w.netIDSDK.log("writeNetIdPermissions response",response);
                w.netIDSDK.writeStore('tpid',response.subject_identifiers.tpid || null);
                w.netIDSDK.writeStore('etpid',response.subject_identifiers.etpid || null); 
                if(w.netIDSDK.writePbVar === true && w.localStorage) {               
                    w.localStorage.setItem('netid_utiq_adtechpass', response.subject_identifiers.etpid);                
                }            
                w.dispatchEvent(new CustomEvent("UC_NETID_TPIDUPDATE", { detail: {tpid:response.subject_identifiers.tpid,etpid:response.subject_identifiers.etpid }}));

            }),
            req.addEventListener("error", function() {
                  w.netIDSDK.log("writeNetIdPermissions error");
            }),
            req.setRequestHeader("Content-type", "application/vnd.netid.permission-center.netid-permissions-v2+json"),
            eq.setRequestHeader("accept", "application/vnd.netid.permission-center.netid-subject-status-v2+json"),
            req.withCredentials = !0,
            req.send(JSON.stringify(data))
          }


      },

      showConsentLayer: function() {
        w.document.getElementById('netIdLayer').style.display = 'block';
      },
      hideConsentLayer: function() {
        w.document.getElementById('netIdLayer').style.display = 'none';
      },
      closeConsentLayer: function() {
        w.netIDSDK.writeStore('deny',true);
        w.netIDSDK.writeStore('denyTS',w.netIDSDK.getTimestamp());
        w.netIDSDK.hideConsentLayer();
      },
      denyConsentLayer: function() {
        w.netIDSDK.writeStore('deny',true);
        w.netIDSDK.writeStore('denyTS',w.netIDSDK.getTimestamp());
        w.netIDSDK.hideConsentLayer();
        w.netIDSDK.writeNetIdPermissions(false);

      },
      isDenyMuteActive: function() {
        var denyTimestamp = w.netIDSDK.readStore('denyTS');
        if(!denyTimestamp) {
          return false;
        }
        else {
          if((Date.now() - denyTimestamp) < (1000 * 60 *60 * 24 * w.netIDSDK.denyMutePeriod)) {
            return true;
          }
          else {
            return false;
          }
        }
      },

      init: function(mode) {

      if(w.netIDSDK.isInitialized) {
          w.netIDSDK.log("already initialized - skipping");
          return;
      }
      if (w.netIDTappId) {
          var lsDate = w.netIDSDK.readStore('cdate');
          if(lsDate != w.netIDSDK.getDate()) {
            w.netIDSDK.log("fetching data from API");
            w.netIDSDK.getNetIdPermissions();


          }
          else {
            w.netIDSDK.log("fetching data from local storage");
            var tpid = w.netIDSDK.readStore('tpid');
            var etpid = w.netIDSDK.readStore('etpid');
            w.netIDSDK.userData = {
                status: tpid && "ID_CONSENT_REQUIRED" !== tpid ? "OK" : "NO_TPID",
                tpid: tpid || "no netid tpid",
                etpid: etpid || "no netid etpid"
            };
          }

          // tcf listener
          if(w && w.__tcfapi && typeof(w.__tcfapi) === 'function')
          {
            __tcfapi('addEventListener', 2, function(tcData, success) {
               if(success && tcData && tcData.eventStatus == 'useractioncomplete') {

                 if (w.netIDSDK.readStore('tpid') !== 'NO_TPID' && w.netIDSDK.readStore('tpid') !== null) {
                   w.netIDSDK.writeNetIdPermissions();
                 }
                 else {
                   // TODO: handling tcstring property doesnt exist
                   if(tcData.tcString)
                   w.netIDSDK.writeBuffer = tcData.tcString;
                   w.netIDSDK.log("delaying netid write as no netid user");
                 }
               };
             });
          }
          w.netIDSDK.isInitialized=true;

      }
      else {
        w.netIDSDK.log("missing cfg var netIDTappId");
      }

    },
    };


    "undefined" == typeof w.netIDSDK && (w.netIDSDK = netIDSDK)
}(window);
