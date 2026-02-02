class KonsoleStream
{
    static async boot() 
    {
        // SET MAIN BACKEND
        // KonsoleStream._backendURL = "https://radio-21-webplayer.konsole-labs.com/";
        // KonsoleStream._backendURL = "https://antenne-sylt-webplayer.konsole-labs.com/";
        // KonsoleStream._backendURL = "https://the-wolf-webplayer.konsole-labs.com/";
        KonsoleStream._backendURL = "https://rockland-radio-webplayer.konsole-labs.com/";

        // DOWNLOAD CURRENT STREAMS
        await KonsoleStream._downloadStreams();

        // CHECK HAS DEFAULT STREAM
        if(KonsoleStream.CurrentStream == undefined) throw new Error("Default Stream is not set.");

        // LOAD DEFAULT STREAM
        // KonsoleStream.audio = new Audio(await KonsoleStream._buildAudioURL(KonsoleStream.CurrentStream.audioUrl));
        // KonsoleStream.audio.volume = 0.5;

        let fetchedColors = await KonsoleStream.getColor();

        //let streamsTxt = updateStreamsText();
        // BUILD HTML STURCTUR
        let container = document.createElement('div');
        container.className = "konsole-stream";
        container.setAttribute("ios-support", ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod', 'MacIntel', 'MacPPC'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document));
        container.setAttribute("selector-open", false);
        container.innerHTML = `
        <div class="ks-audio-bar">
            <div class="ks-ab-info">
                <div class="ks-abi-cover"></div>
                <div class="ks-abi-text">
                    <div class="ks-abi-artist text-break">
                        Keine Information Verfügbar
                    </div>
                    <div class="ks-abi-title text-break">
                        Keine Information Verfügbar
                    </div>
                    <div class="ks-abi-stream text-break">
                        Keine Information Verfügbar
                    </div>
                </div>
            </div>
            <div class="ks-ab-meta">
                ${KonsoleStream.CurrentStream.newsURL 
                ? `<a class="ks-abm-advertising animButton" href="${KonsoleStream.CurrentStream.newsURL.replaceAll("https://" + window.location.hostname, "")}" target="_self">
                        <span>
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="icon_news">
                                <g id="_x39_5nOxj_00000092439165867845937550000011917908723023845309_">
                                <g id="Group">
                                <path id="Vector" d="M43.1183 9.64285C44.1897 9.64285 45.1897 9.64285 46.2016 9.64285C47.5945 9.64285 48.4516 10.5119 48.4516 11.9167C48.4516 21.3928 48.4516 30.869 48.4516 40.3333C48.4516 43.3571 46.1064 45.7024 43.0707 45.7024C31.0112 45.7024 18.9516 45.7024 6.89211 45.7024C4.34449 45.7024 2.24926 44.0357 1.67783 41.5595C1.59449 41.2143 1.54688 40.8571 1.54688 40.5C1.54688 29.1548 1.54688 17.8095 1.54688 6.46427C1.54688 5.23808 2.42783 4.35713 3.68973 4.29761C3.74926 4.29761 3.82068 4.29761 3.88021 4.29761C16.1897 4.29761 28.5112 4.29761 40.8207 4.29761C41.9874 4.29761 42.8207 4.89285 43.0707 5.92856C43.1183 6.14285 43.1183 6.38094 43.1183 6.60713C43.1183 7.59523 43.1183 8.59523 43.1183 9.64285ZM46.154 41.4524C45.3921 41.4524 44.6659 41.4643 43.9397 41.4524C43.6421 41.4524 43.3207 41.4405 43.035 41.3571C41.8207 41.0476 41.0588 40.0238 41.0588 38.7024C41.0588 28.119 41.0588 17.5476 41.0588 6.96427C41.0588 6.7857 41.0588 6.60713 41.0588 6.40475C28.5707 6.40475 16.1064 6.40475 3.6064 6.40475C3.6064 6.57142 3.6064 6.72618 3.6064 6.86904C3.6064 17.9762 3.6064 29.0714 3.6064 40.1786C3.6064 42.25 4.97545 43.619 7.05878 43.619C18.9874 43.619 30.9159 43.619 42.8445 43.619C43.1302 43.619 43.4278 43.5952 43.7135 43.5595C44.8088 43.4167 45.8802 42.5 46.154 41.4524ZM46.3564 39.369C46.3564 30.119 46.3564 20.9167 46.3564 11.7262C45.2731 11.7262 44.2254 11.7262 43.1183 11.7262C43.1183 11.8809 43.1183 12.0238 43.1183 12.1548C43.1183 20.9167 43.1183 29.6786 43.1183 38.4405C43.1183 38.5833 43.1064 38.7262 43.1302 38.8571C43.1778 39.1428 43.3326 39.369 43.654 39.369C44.5469 39.369 45.4397 39.369 46.3564 39.369Z" fill="white"/>
                                <path id="Vector_2" d="M20.7257 22.4286C20.7257 24.1429 20.7257 25.869 20.7257 27.5833C20.7257 28.4167 20.3448 28.8095 19.5233 28.8095C16.0591 28.8095 12.5948 28.8095 9.13049 28.8095C8.28525 28.8095 7.9043 28.4167 7.9043 27.5714C7.9043 24.119 7.9043 20.6667 7.9043 17.2262C7.9043 16.4048 8.30906 16 9.11858 16C12.5829 16 16.0472 16 19.5114 16C20.3329 16 20.7257 16.3929 20.7257 17.2143C20.7257 18.9405 20.7257 20.6905 20.7257 22.4286ZM18.6305 26.7262C18.6305 23.8333 18.6305 20.9643 18.6305 18.0595C18.4638 18.0595 18.3329 18.0595 18.19 18.0595C15.5948 18.0595 12.9995 18.0714 10.4043 18.0476C10.0591 18.0476 9.95192 18.1429 9.95192 18.4881C9.96382 21.0952 9.96382 23.7024 9.96382 26.3095C9.96382 26.4405 9.97573 26.5833 9.98763 26.7143C12.8924 26.7262 15.7495 26.7262 18.6305 26.7262Z" fill="white"/>
                                <path id="Vector_3" d="M22.3083 12.7619C17.8916 12.7619 13.4749 12.7619 9.05826 12.7619C8.22493 12.7619 7.70112 12.0714 7.98683 11.3334C8.12969 10.9643 8.41541 10.7381 8.82017 10.6905C8.91541 10.6786 9.02255 10.6786 9.12969 10.6786C17.9392 10.6786 26.7487 10.6786 35.5583 10.6786C36.3321 10.6786 36.7845 11.0714 36.7725 11.7262C36.7725 12.2738 36.3559 12.7262 35.7964 12.75C35.5821 12.7619 35.3678 12.75 35.1416 12.75C30.8678 12.7619 26.5821 12.7619 22.3083 12.7619Z" fill="white"/>
                                <path id="Vector_4" d="M30.3687 26.619C32.1425 26.619 33.9044 26.619 35.6782 26.619C36.1901 26.619 36.583 26.9047 36.7258 27.3571C36.8568 27.7738 36.7258 28.2619 36.333 28.5C36.1306 28.6309 35.8568 28.7143 35.6187 28.7143C32.1187 28.7262 28.6187 28.7262 25.1187 28.7262C24.4044 28.7262 23.9282 28.2738 23.952 27.6428C23.9758 27.0357 24.452 26.619 25.1425 26.619C26.8806 26.619 28.6187 26.619 30.3687 26.619Z" fill="white"/>
                                <path id="Vector_5" d="M14.3095 37.238C16.0833 37.238 17.8452 37.238 19.619 37.238C20.1428 37.238 20.5237 37.5118 20.6666 37.9642C20.8095 38.3928 20.6785 38.869 20.2976 39.1071C20.0952 39.238 19.8214 39.3214 19.5833 39.3214C16.0714 39.3333 12.5595 39.3333 9.03565 39.3333C8.35708 39.3333 7.88089 38.8809 7.8928 38.2738C7.9047 37.6666 8.38089 37.238 9.05946 37.238C10.8214 37.238 12.5595 37.238 14.3095 37.238Z" fill="white"/>
                                <path id="Vector_6" d="M30.3568 37.2381C32.1187 37.2381 33.8687 37.2381 35.6306 37.2381C36.5235 37.2381 37.0592 38.0833 36.6187 38.8095C36.3806 39.2143 35.9997 39.3333 35.5473 39.3333C33.7854 39.3333 32.0354 39.3333 30.2735 39.3333C28.5473 39.3333 26.8092 39.3452 25.083 39.3333C24.214 39.3333 23.6902 38.5595 24.0592 37.8214C24.2735 37.381 24.6545 37.2262 25.1306 37.2262C26.8687 37.2381 28.6187 37.2381 30.3568 37.2381Z" fill="white"/>
                                <path id="Vector_7" d="M30.3679 15.988C32.1417 15.988 33.9036 15.988 35.6775 15.988C36.1298 15.988 36.4632 16.1785 36.6656 16.5833C36.8441 16.9404 36.8084 17.2976 36.5822 17.6309C36.3441 17.988 35.987 18.0833 35.5822 18.0833C34.606 18.0833 33.6179 18.0833 32.6417 18.0833C30.1536 18.0833 27.6775 18.0833 25.1894 18.0833C24.6775 18.0833 24.2489 17.9523 24.0346 17.4523C23.7251 16.738 24.237 15.9999 25.0584 15.988C26.8322 15.988 28.606 15.988 30.3679 15.988Z" fill="white"/>
                                <path id="Vector_8" d="M30.3912 23.3929C28.5936 23.3929 26.796 23.3929 25.0103 23.3929C24.4627 23.3929 24.0579 23.0358 23.9627 22.5239C23.8793 22.0834 24.1412 21.5834 24.5817 21.4167C24.7365 21.3572 24.9269 21.3334 25.1055 21.3334C28.6174 21.3334 32.1293 21.3334 35.6412 21.3334C36.3436 21.3334 36.7722 21.7619 36.7603 22.3929C36.7484 23 36.3079 23.4048 35.6174 23.4048C33.8793 23.3929 32.1293 23.3929 30.3912 23.3929Z" fill="white"/>
                                <path id="Vector_9" d="M14.3203 34.0119C12.5227 34.0119 10.737 34.0119 8.9394 34.0119C8.40368 34.0119 7.99892 33.6429 7.91559 33.1191C7.84416 32.6667 8.11797 32.1905 8.55844 32.0238C8.7013 31.9762 8.85606 31.9524 8.99892 31.9524C12.5346 31.9524 16.0703 31.9524 19.618 31.9524C20.2965 31.9524 20.7251 32.3691 20.7251 32.9881C20.7251 33.6072 20.2846 34.0119 19.5942 34.0119C17.8323 34.0119 16.0823 34.0119 14.3203 34.0119Z" fill="white"/>
                                <path id="Vector_10" d="M30.3921 31.9405C32.1659 31.9405 33.9278 31.9405 35.7016 31.9405C36.3206 31.9405 36.7373 32.3333 36.7611 32.9048C36.7849 33.5238 36.3683 34 35.7492 34C32.154 34.0119 28.5706 34.0119 24.9754 34C24.3802 34 23.9278 33.5238 23.9397 32.9524C23.9516 32.3691 24.3802 31.9405 24.9992 31.9286C26.7968 31.9405 28.5944 31.9405 30.3921 31.9405Z" fill="white"/>
                                </g>
                                </g>
                                </g>
                            </svg>
                            <span class="ks-abma-a">News</span>
                        </span>
                    </a>`
                : ``}
                <div class="ks-abm-state animButton" state="0">
                    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" class="ks-abms-play">
                        <g id="play-icon" clip-path="url(#clip0_2282_1393)">
                        <circle id="Ellipse 11" cx="56" cy="56" r="56" fill="#27348B"/>
                        <g id="p6TfIi_00000062190239543380020000000006162759726401267391_">
                        <g id="Group">
                        <path id="Vector" d="M44.7875 80.981C43.65 80.981 42.5271 80.981 41.375 80.981C41.375 65.0123 41.375 49.0581 41.375 33.0894C42.3375 31.2227 43.65 30.3185 45.6479 31.6602C56.6583 38.981 67.6687 46.3019 78.65 53.6519C80.6625 55.0081 80.6187 56.6998 78.6062 58.1289C76.2875 59.7623 73.8958 61.2935 71.5479 62.8977C62.6229 68.9206 53.6979 74.9435 44.7875 80.981Z" fill="white"/>
                        </g>
                        </g>
                        <path id="Vector_2" d="M55.9688 112C41.0062 112 26.9479 106.181 16.375 95.5938C5.7875 85.0208 -0.03125 70.9625 -0.03125 56C-0.03125 41.0375 5.7875 26.9792 16.375 16.4062C26.9479 5.81875 41.0062 0 55.9688 0C70.9313 0 84.9896 5.81875 95.5625 16.4062C106.135 26.9937 111.969 41.0521 111.969 56C111.969 70.9479 106.15 85.0208 95.5625 95.5938C84.975 106.167 70.9313 112 55.9688 112ZM55.9688 4.53542C42.2167 4.53542 29.2958 9.8875 19.5833 19.6C9.87083 29.3125 4.50417 42.2479 4.50417 56C4.50417 69.7521 9.85625 82.6729 19.5687 92.3854C29.2812 102.098 42.2167 107.45 55.9542 107.45C69.7063 107.45 82.6271 102.098 92.3396 92.3854C102.052 82.6729 107.419 69.7521 107.419 56C107.419 42.2479 102.067 29.3271 92.3542 19.6146C82.6417 9.90208 69.7063 4.53542 55.9688 4.53542Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2282_1393">
                        <rect width="112" height="112" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" class="ks-abms-stop">
                        <g id="stop icon" clip-path="url(#clip0_2489_712)">
                        <circle id="Ellipse 11" cx="56" cy="56" r="56" fill="#27348B"/>
                        <path id="Vector" d="M55.9688 112C41.0062 112 26.9479 106.181 16.375 95.5938C5.7875 85.0208 -0.03125 70.9625 -0.03125 56C-0.03125 41.0375 5.7875 26.9792 16.375 16.4062C26.9479 5.81875 41.0062 0 55.9688 0C70.9313 0 84.9896 5.81875 95.5625 16.4062C106.135 26.9937 111.969 41.0521 111.969 56C111.969 70.9479 106.15 85.0208 95.5625 95.5938C84.975 106.167 70.9313 112 55.9688 112ZM55.9688 4.53542C42.2167 4.53542 29.2958 9.8875 19.5833 19.6C9.87083 29.3125 4.50417 42.2479 4.50417 56C4.50417 69.7521 9.85625 82.6729 19.5687 92.3854C29.2812 102.098 42.2167 107.45 55.9542 107.45C69.7063 107.45 82.6271 102.098 92.3396 92.3854C102.052 82.6729 107.419 69.7521 107.419 56C107.419 42.2479 102.067 29.3271 92.3542 19.6146C82.6417 9.90208 69.7063 4.53542 55.9688 4.53542Z" fill="white"/>
                        <rect id="Rectangle 862" x="33" y="34" width="45" height="45" rx="3" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2489_712">
                        <rect width="112" height="112" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg> 
                </div>
                <div class="ks-abm-more-streams animButton">
                        <span>
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group">
                                <path id="Vector" d="M0 31.9762C0 22.0952 0 12.2024 0 2.32143C0.214286 1.85714 0.369048 1.35714 0.654762 0.928571C1.03571 0.357143 1.67857 0.154762 2.32143 0C12.2262 0 22.131 0 32.0357 0C32.131 0.0357143 32.2262 0.0714285 32.3214 0.095238C33.3333 0.357143 33.9762 1 34.2262 2.0119C34.3095 2.35714 34.2857 2.71429 34.2857 3.07143C34.2976 3.94048 34.2857 4.80952 34.2857 5.72619C35.3929 5.72619 36.4881 5.60714 37.3452 6.45238C38.2262 7.30952 38.0952 8.41667 38.0952 9.53572C38.5595 9.53572 38.9881 9.52381 39.4167 9.53572C40.5595 9.55952 41.5357 10.3333 41.8214 11.4286C41.8452 11.5357 41.8929 11.6429 41.9286 11.7619C41.9286 21.0238 41.9286 30.2857 41.9286 39.5476C41.9048 39.619 41.869 39.6786 41.8571 39.75C41.5476 41.0595 40.619 41.8333 39.2857 41.8333C30.25 41.8452 21.2024 41.8452 12.1667 41.8333C10.6071 41.8333 9.54762 40.7381 9.53571 39.1905C9.53571 38.8095 9.53571 38.4286 9.53571 38.0357C9.13095 38.0357 8.78571 38.0357 8.45238 38.0357C6.78571 38.0357 5.7381 36.9762 5.72619 35.3095C5.72619 34.9643 5.72619 34.619 5.72619 34.2262C4.58333 34.2262 3.5119 34.25 2.44048 34.2262C1.35714 34.2024 0.452381 33.4881 0.130952 32.4524C0.0952379 32.2857 0.047619 32.131 0 31.9762ZM1.94048 17.1071C1.94048 21.869 1.94048 26.631 1.94048 31.4048C1.94048 32.1905 2.09524 32.3452 2.88095 32.3452C12.4048 32.3452 21.9167 32.3452 31.4405 32.3452C32.2381 32.3452 32.4048 32.1786 32.4048 31.381C32.4048 21.881 32.4048 12.381 32.4048 2.88095C32.4048 2.10714 32.25 1.95238 31.4643 1.95238C21.9405 1.95238 12.4286 1.95238 2.90476 1.95238C2.07143 1.95238 1.95238 2.08333 1.95238 2.90476C1.94048 7.63095 1.94048 12.369 1.94048 17.1071ZM7.65476 34.2262C7.65476 34.5595 7.65476 34.8333 7.65476 35.119C7.65476 36.0119 7.78571 36.1429 8.69048 36.1429C17.5119 36.1429 26.3333 36.1429 35.1429 36.1429C36.0714 36.1429 36.2143 36 36.2143 35.0952C36.2143 26.2976 36.2143 17.5 36.2143 8.69048C36.2143 8.52381 36.2619 8.33333 36.1905 8.20238C36.0833 8 35.9167 7.71429 35.7381 7.67857C35.2857 7.60714 34.8095 7.65476 34.2976 7.65476C34.2976 7.89286 34.2976 8.08333 34.2976 8.27381C34.2976 15.9643 34.2976 23.6429 34.2976 31.3333C34.2976 31.6548 34.2976 31.9881 34.2262 32.3095C33.9286 33.5238 32.9524 34.2143 31.5714 34.2143C23.8095 34.2143 16.0476 34.2143 8.28571 34.2143C8.08333 34.2262 7.89286 34.2262 7.65476 34.2262ZM11.4524 38.0357C11.4524 38.369 11.4524 38.6429 11.4524 38.9048C11.4524 39.7976 11.5833 39.9286 12.4881 39.9286C21.3214 39.9286 30.1548 39.9286 38.9881 39.9286C39.9048 39.9286 40.0119 39.8214 40.0119 38.9048C40.0119 30.0952 40.0119 21.2738 40.0119 12.4643C40.0119 12.3333 40.0119 12.2024 40.0119 12.0595C40 11.6905 39.7857 11.4643 39.4405 11.4405C39.0119 11.4048 38.5833 11.4286 38.119 11.4286C38.119 11.6429 38.119 11.8214 38.119 12C38.119 19.7262 38.119 27.4643 38.119 35.1905C38.119 37.0119 37.1071 38.0238 35.2857 38.0238C27.5357 38.0238 19.7857 38.0238 12.0476 38.0238C11.8571 38.0357 11.6786 38.0357 11.4524 38.0357Z" fill="white"/>
                                <path id="Vector_2" d="M17.1539 18.0476C17.1539 17.7857 17.1539 17.6071 17.1539 17.4405C17.1539 14.5952 17.1539 11.7381 17.1539 8.89285C17.1539 7.7619 17.7968 7.36904 18.8206 7.86904C19.9634 8.44047 21.1063 9 22.2492 9.58333C22.7611 9.84524 22.9634 10.2619 22.8444 10.75C22.6896 11.3333 22.0468 11.5952 21.4396 11.3095C20.6777 10.9405 19.9277 10.5595 19.0825 10.1429C19.0825 10.369 19.0825 10.5357 19.0825 10.7024C19.0825 14.369 19.0825 18.0357 19.0825 21.7024C19.0825 23.8929 17.8325 25.7024 15.8801 26.3809C13.8087 27.0952 11.523 26.3095 10.3325 24.4762C9.11821 22.6071 9.3444 20.2262 10.8801 18.619C12.3801 17.0476 14.8087 16.7024 16.6896 17.7976C16.8206 17.8452 16.9396 17.9286 17.1539 18.0476ZM17.1539 21.8809C17.1539 20.2857 15.892 19.0357 14.2968 19.0476C12.7254 19.0595 11.4634 20.3095 11.4515 21.869C11.4396 23.4286 12.7373 24.7381 14.3087 24.7381C15.8801 24.7381 17.1539 23.4643 17.1539 21.8809Z" fill="white"/>
                                </g>
                                </svg>                            
                            <a class="ks-abma-a" href="#">STREAMS</a>
                        </span>
                </div>
                </div>
                <div class="test1">
                <div class="ks-abm-streams-container">
                    <p class="ks-abm-streams-txt">Meistgehörte Streams</p>
                    <div class="ks-abm-streams"></div>
                </div>
                <div class="ks-abm-volume">
                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.35 14C20.35 12.053 19.228 10.381 17.6 9.567V18.422C19.228 17.619 20.35 15.947 20.35 14ZM5.5 11.8V16.2C5.5 16.805 5.995 17.3 6.6 17.3H9.9L13.519 20.919C14.212 21.612 15.4 21.117 15.4 20.138V7.85099C15.4 6.87199 14.212 6.37699 13.519 7.06999L9.9 10.7H6.6C5.995 10.7 5.5 11.195 5.5 11.8Z" fill="#FFFFFF" fill-opacity="0.8"/>
                    </svg>
                    <input type="range" min="0" max="100">
                </div>
            </div>
        </div>
        <div class="konsole-stream-selector">
            <div class="ks-selector-headline">
                <button class="ks-selector-btn" onclick="KonsoleStream.close();">
                    <svg class="ks-sh-svg" width="24" height="28" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7105 7.38479C14.3205 6.99479 13.6905 6.99479 13.3005 7.38479L8.71047 11.9748C8.32047 12.3648 8.32047 12.9948 8.71047 13.3848L13.3005 17.9748C13.6905 18.3648 14.3205 18.3648 14.7105 17.9748C15.1005 17.5848 15.1005 16.9548 14.7105 16.5648L10.8305 12.6748L14.7105 8.79479C15.1005 8.40479 15.0905 7.76479 14.7105 7.38479Z" fill="white" fill-opacity="0.8"/>
                    </svg>                                    
                    <span class="ks-selector-btntxt animButton">zurück</span>
                </button>
                <span class="ks-selector-spantxt">Alle Streams</span>
            </div>
            <div class="ks-selector-streams"></div>
        </div>
        </div>
        <style>
            :root 
            {
                --volumeInputColor: ${fetchedColors['volume-input-color']};
                --volumeSvgBackground: ${fetchedColors['volume-svg-background']};
            }
            .ks-audio-bar
            {   
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 124px;
                background: linear-gradient(transparent 37.9%, ${fetchedColors['audio-bar']} 37.9%);
                z-index: 1001;
            }
            .ks-ab-info
            {
                display: grid;
                grid-template-columns: 1fr 5fr;
                flex-direction: column;
                position: relative;
                margin-left: 4.86%;
            }
            .ks-abi-cover 
            {
                width: 97.7px;
                height: 99.2px;
                background-size: auto 100%;
                min-width: 97px;
                background-color: transperent;
                margin-top: 14px;
                border: 2px solid #fff;
                border-radius: 2px;
                box-shadow: 0px 2px 7px rgba(0,0,0,0.5);
            }   
            .ks-abi-text
            {
                flex-direction: column;
                justify-content: center;
                margin-left: 3%;
                width: 420px;
                margin-top: 49px;
                overflow: hidden;

            }
            .ks-abi-artist,
            .ks-abi-title,
            .ks.abi-stream
            {
                color: ${fetchedColors['artist-title-streams']};
                max-height: 23px;
                word-wrap: break-word !important;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1 !important;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .ks-abi-artist
            {
                margin-top: 5px;
                font-size: 20px;
                font-weight: 700;
                text-transform: uppercase; 
            }
            .ks-abi-title
            {
                font-size: 16px;
                font-weight: 100;
            }
            .ks-abi-stream
            {
                color: ${fetchedColors['stream']};
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 13px;
            }
            .ks-ab-meta
            {
                height: 124px;
                display: grid;
                grid-template-columns: 3fr 1fr 3fr;
                align-items: center;
                justify-content: center;
            }
            .ks-abm-state 
            {
                height: 95px;
                width: 112px;
                display: flex;
                justify-content: center;
                align-items: end;
            }
            .ks-abm-state svg
            {
                display: none;
                width: 112px;
                height: 112px;
                cursor: pointer;
            }
            .test1
            {
                display: grid;
                grid-template-columns: 2fr 1fr;
            }
            .ks-abm-state[state="0"] .ks-abms-play,
            .ks-abm-state[state="1"] .ks-abms-stop
            {
                display: unset;
            }
            .ks-abms-play circle 
            {
                fill: ${fetchedColors['play-background']}
            }
            .ks-abms-play path 
            {
                fill: ${fetchedColors['play-color']}
            }
            .ks-abms-stop circle 
            {
                fill: ${fetchedColors['play-background']}
            }
            .ks-abms-stop path 
            {
                fill: ${fetchedColors['play-color']}
            }
            .ks-abms-stop rect 
            {
                fill: ${fetchedColors['play-color']}
            }
            .ks-abm-advertising[url="false"]
            {
                visibility: hidden;
            }
            .ks-abm-advertising > span,
            .ks-abm-more-streams span
            {
                display: flex;
                flex-direction: row;
                fill: ${fetchedColors['icons']};
                border-radius: 50px;
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                line-height: 18px;
                text-align: center;
                letter-spacing: 0.0095em;
                cursor: pointer;
                height: 42px;
                align-items: center;
            }
            .ks-abm-advertising path,
            .ks-abm-more-streams path
            {
                fill: ${fetchedColors['icons']};
            }
            .ks-abm-streams
            {
                display: flex;
                align-items: center;
                min-width: 100%;
                margin-top: 5px;
                justify-content:center;
            }
            .ks-abm-stream
            {   
                width: 50px;
                height: 50px;
                display: flex;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                margin-right: 10px;
                cursor: pointer;
                border: 1px solid #fff;
                border-radius: 2px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.5);
            }
            .ks-abm-streams-txt
            {
                color: ${fetchedColors['artist-title-streams']};
                text-align: center;
                font-feature-settings: 'clig' off, 'liga' off;
                font-size: 10px;
                font-style: normal;
                font-weight: 700;
                line-height: 100%; /* 10px */
                text-transform: uppercase;
                margin-top: 52px;
                margin-bottom: 5px;
                justify-content:center;
            }
            /*
            .ks-abm-stream.animate
            {
                animation: goBigger 0.8s linear 1 forwards;
            }
            */
            @keyframes goBigger
            {
               0%   {}
               33%  {width: 90px; height: 60px;}
               66%  {width: 120px; height: 120px;}
               100% {width: 90px; height: 90px;}
            }
            
            .ks-abm-advertising,
            .ks-abm-more-streams
            {   
                display: flex;
                align-items: self-end;
                position: relative;
                height: 90px;
            }
            .ks-abm-advertising
            {
                justify-content: end;
                margin-right: 80px;
            }
            .ks-abm-more-streams
            {
                justify-content: flex-start;
                margin-left: 80px;
            }
            .ks-select-button
            {   
                display: flex;
                align-items: center;
                position: relative;
                height: 90px;
                margin-right: 15.3px;
                margin-left: 40px;
            }
            .ks-select-button svg
            {
                position: absolute;
                height: 40px;
                width: 40px;
                border-radius: 100%;
                left: -1px;
                margin-top: 0px;
                cursor: pointer;
            }
            .ks-select-button span
            {
                display: flex;
                flex-direction: row;
                color: white;
                border-radius: 50px;
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                line-height: 18px;
                text-align: center;
                letter-spacing: 0.0095em;
                cursor: pointer;
                height: 42px;
                align-items: center;
            }
            .ks-select-button-2
            {   
                display: flex;
                align-items: center;
                position: relative;
                height: 40px;
                margin: 25px 5px 25px 25px;
            }
            .ks-select-button-2 svg
            {
                position: absolute;
                height: 40px;
                width: 40px;
                border-radius: 100%;
                left: -1px;
                margin-top: 0px;
                cursor: pointer;
            }
            .ks-select-button-2 span
            {
                display: flex;
                flex-direction: row;
                color: white;
                border-radius: 50px;
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                line-height: 18px;
                text-align: center;
                letter-spacing: 0.0095em;
                cursor: pointer;
                height: 42px;
                align-items: center;
            }
            .ks-select-nologo-button
            {   
                display: flex;
                align-items: center;
                position: relative;
                height: 40px;
                margin: 25px 5px;
            }
            .ks-black-wrapper
            {
                display: flex;
                flex-flow: column;
            }
            .ks-black-text
            {
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 26px;
                letter-spacing: -0.016rem;
                color: #FFFFFF;
                margin-bottom: 10px;
                text-align: center;
                margin-top: 20px;
            }
            .ks-black
            {
                display: flex;
                background-color: #000000;
                justify-content: center;
                padding: 0 40px;
                margin: 0 40px;
            }
            .ks-select-a
            {
                text-decoration: none;
                color: #fff !important;
                font-weight: 500;
                font-size: 1.125rem;
                line-height: 1.125rem;
                background-image: radial-gradient(circle at 0 50%,transparent 0,transparent 21.5px,#77B82A 0px);
                padding: 11px 20px 11px 33px;
                max-height: calc(1.125rem + 24px);
                margin-left: 20px;
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                white-space: nowrap;@
            }
            .ks-select-a-2
            {
                text-decoration: none;
                color: #fff !important;
                font-weight: 500;
                font-size: 1.125rem;
                line-height: 1.125rem;
                background-color: #77B82A;
                padding: 11px 20px;
                max-height: calc(1.125rem + 24px);
                margin-left: 20px;
                border-radius: 50px;
                white-space: nowrap;
            }							
            .ks-abma-a
            {
                text-decoration: none;
                color: ${fetchedColors['icons']};
                font-feature-settings: 'clig' off, 'liga' off;
                font-size: 20px;
                font-style: normal;
                font-weight: 800;
                line-height: 100%; /* 20px */
                text-transform: uppercase;
                max-height: calc(1.125rem + 24px);
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                white-space: nowrap;
                position: relative;
            }
            .ks-abma-a:first-child 
            {
                margin-right: 50px;
            }
            .ks-abma-a:nth-child(2) 
            {
                margin-left: 10px;
            }
    
            .ks-abm-advertising svg,
            .ks-abm-more-streams svg
            {
                height: 50px;
                width: 50px;
                cursor: pointer;
            }
            .ks-abm-volume
            {
                display: flex;
                align-items: center;
                margin-left: 20px;
                margin-top: 47px;
            }
            .ks-abm-volume svg
            {
                width: 26.4px;
                height: 26.4px;
            }
            .ks-abm-volume path
            {
                fill: ${fetchedColors['volume-icon']};
            }
            .ks-abm-volume input[type="range"] {
                width: 85px;
                height: 5px;
                background: linear-gradient(to right, var(--volumeInputColor) 0%, var(--volumeInputColor) 50%, var(--volumeSvgBackground) 50%, var(--volumeSvgBackground) 100%);
                border-radius: 3.15px;
                outline: none;
                transition: background 450ms ease-in;
                -webkit-appearance: none;
                cursor: pointer;
            }
            input[type='range']::-webkit-slider-thumb 
            {
                width: 15px;
                -webkit-appearance: none;
                height: 15px;
                background: var(--volumeCircle, ${fetchedColors['volume-circle']});
                border-radius: 60px;
                cursor: pointer;
            }
            
            .ks-abm-volume input[type="range"]::-moz-range-thumb
            {
                width: 15px;
                height: 15px;
                background: var(--volumeCircle, ${fetchedColors['volume-circle']});
                border-radius: 60px;
                border: none;
                cursor: pointer;
            }
            
            
            /* ############### STREAM SELECTION DIV ############### */
            .konsole-stream-selector 
            {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1000;
                background-color: white;
                /* overflow: hidden; */
                margin: 0;
                padding: 0;
                background: ${fetchedColors['streams-background']};
            }
            
            .konsole-stream[selector-open="false"] .konsole-stream-selector
            {
                display: none;
            }
            .ks-hidden
            {
                overflow: hidden;
                height: 100vh;
            }
            
            .ks-selector-headline
            {
                height: 61px;
                top: 0;
                display: flex;
                align-items: center;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
                position: relative;
                background: ${fetchedColors['streams-background']};
            }
            
            .konsole-stream[ios-support="false"] .ks-sh-svg
            {
                padding-top: 6px;
            }
            .ks-sh-svg path
            {
                fill: ${fetchedColors['streams-txt']};
            }
            
            .ks-selector-btn
            {
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                border: none;
                padding: 0;
                margin: 18.5px 0px;
                cursor: pointer;
                background: ${fetchedColors['streams-background']};
                min-width: unset;
            }
            
            .ks-selector-btntxt
            {
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 23px;
                letter-spacing: -0.016em;
                color:${fetchedColors['streams-txt']};
                text-transform: initial;
            }
            
            .ks-selector-spantxt
            {
                font-style: normal;
                font-weight: 600;
                font-size: 28px;
                letter-spacing: 1px;
                line-height: 24px;
                color: ${fetchedColors['streams-txt']};
                position: absolute;
                left: 50vw;
                text-transform: uppercase;
                min-width: unset;
                transform: translateX(-50%);
            }
            
            .ks-selector-streams
            {
                height: calc(100vh - 151px);
                overflow-y: scroll;
                background: ${fetchedColors['streams-background']};
            }
            
            .ks-stream-section-div
            {
                padding: 40px 0 0 0;
            }
            
            .ks-stream-section-div:last-child
            {
                padding-bottom: 117px;
            }
            
            .ks-selector-stream-logo
            {
                width: 145px;
                height: 145px;
                margin: 19px 25px 8px 0;
                background-size: 145px 145px;
                border-radius: 8px;
                position: relative;
                cursor: pointer;
            }
            
            .ks-selector-stream-svg-bg
            {
                background-color: black;
                width: 145px;
                height: 145px;
                opacity: 0.7;
                border-radius: 8px;
                position: absolute;
                top: 0;
                left: 0;
                display: none;
            }
            .ks-selector-stream-svg-overlay
            {
                width: 145px;
                border-radius: 8px;
                height: 145px;
                top: 0;
                left: 0;
                position: absolute;
                display: none;
                justify-content: center;
                align-items: center;
            }
            .ks-selector-stream-logo:hover .ks-selector-stream-svg-bg,
            .ks-selector-stream-logo:hover .ks-selector-stream-svg-overlay
            {
                display: flex;
            }
            .ks-selector-stream-svg path
            {
                fill: var(--playColor, ${fetchedColors['play-color']});
            }
            .ks-selector-stream-svg circle
            {
                fill: var(--playBackground, ${fetchedColors['play-background']});
            }
            .ks-selector-stream-span
            {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: 0.0095rem;
                color: ${fetchedColors['streams-txt']};
                max-width: 145px;
                display: -webkit-box;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical;
                overflow: hidden;
                overflow-wrap: break-word;
                text-overflow: ellipsis;
                max-height: calc(20px * 2);
                text-align: center;
            }
            
            .ks-streams-section-headline
            {
                font-style: normal;
                padding-left: 40px;
                font-weight: 700;
                font-size: 20px;
                line-height: 20px;
                letter-spacing: -0.016rem;
                color: ${fetchedColors['streams-txt']};
            }
            
            .ks-stream-section-wrapper, .ks-select-section-wrapper
            {
                display: flex;
                flex-wrap: wrap;
                padding-left: 40px;
            }
       
            .ks-selector-stream-logo
            {
                width: 145px;
                height: 145px;
                margin: 19px 25px 8px 0;
                background-size: 145px 145px;
                border-radius: 8px;
                position: relative;
            }
            
            .ks-selector-stream-svg-bg
            {
                background-color: black;
                width: 145px;
                height: 145px;
                opacity: 0.7;
                border-radius: 8px;
                position: absolute;
                top: 0;
                left: 0;
                display: none;
            }
            .ks-selector-stream-svg-overlay
            {
                width: 145px;
                border-radius: 8px;
                height: 145px;
                top: 0;
                left: 0;
                position: absolute;
                display: none;
                justify-content: center;
                align-items: center;
            }
            .ks-selector-stream-logo:hover .ks-selector-stream-svg-bg,
            .ks-selector-stream-logo:hover .ks-selector-stream-svg-overlay
            {
                display: flex;
            }
            
            .ks-selector-stream-svg-bg-active
            {
                display: none;
            }
            .ks-selector-stream-svg-bg-active svg
            {
                margin-left: 10px;
                margin-top: 10px;
            }
            .ks-selector-stream-svg-bg-active.active
            {
                width: 145px;
                height: 145px;
                border-radius: 8px;
                position: relative;
                display: block;
            }
            
            .ks-ab-info-small
            {
                display: none;
            }
            
            /* Animation Classes */
            .animButton
            {
                transition: transform 0.125s ease-in-out;
            }
            
            .animButton:active
            {
            transform: scale(1.05);
            }
            
            .ks-select-text
            {
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 26px;
                letter-spacing: -0.016rem;
                color: #000000;                        
            }
            .ks-select-header
            {
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 26px;
                letter-spacing: -0.016rem;
                color: #000000;
                margin-bottom: 10px;
            }
            a.ks-select-link, a.ks-select-link:visited
            {
                color: #000000;
                text-decoration: underline;
            }
    
            /* MEDIA STYLES */
            @media screen and (max-width: 1600px) 
            {
                .ks-abm-state svg
                {
                    width: 90px;
                    height: 90px;
                }
                .ks-abm-advertising svg,
                .ks-abm-more-streams svg,
                .ks-abm-stream
                {
                    width: 40.18px;
                    height: 40.18px;
                }
                .ks-abi-cover
                {
                    width: 82.59px;
                    height: 83.58px;
                    min-width: 82px;
                    border: 2px solid #fff;
                    border-radius: 2px;
                    box-shadow: 0px 2px 7px rgba(0,0,0,0.5);
                }
                .ks-abi-artist,
                .ks-abma-a
                {
                    font-size: 17px;
                    line-height: 17px;
                }
                .ks-abi-title
                {
                    font-size: 14px;
                    line-height: 14px;
                }
                .ks-abi-stream
                {
                    font-size: 11px;
                    line-height: 11px;
                }
                .ks-abm-volume input[type="range"]::-moz-range-thumb
                {
                    width: 10px;
                    height: 10px;
                }
                .ks-abi-text
                {
                    width: 300px;
                    margin-top: 55px;
                }
                .ks-abm-advertising
                {
                    margin-right: 3%
                }
                .ks-abm-more-streams
                {
                    margin-left: 3%
                }
                .ks-abma-a:first-child
                {
                    margin-right: 40px;
                }
                .ks-abm-advertising svg
                {

                }
            }
            @media screen and (max-width: 1281px) {

                .ks-audio-bar
                {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                }
                .ks-abi-cover,
                .ks-abm-streams-container,
                .ks-abm-volume
                {
                    display: none;
                }
                .ks-abm-advertising[url="false"]
                {
                    display: none;
                }
                .ks-ab-meta
                {
                    height: 96px;
                }

                .ks-abm-state
                {
                    position: fixed;
                    left: -8px;
                    bottom: 20px;
                }

                .ks-abm-state svg
                {
                    width: 64px;
                    height: 64px;
                    bottom: 10px;
                    margin: 0 0 0 0;
                }
                .ks-audio-bar
                {
                    height: 77px;
                    background: linear-gradient(transparent 17.5%, ${fetchedColors['audio-bar']} 17.5%);
                }

                .ks-abi-text
                {
                    width: 157px;
                    margin: 0 0 0 0;
                }
                .ks-ab-info
                {
                    margin-left: 86px;
                    margin-top: 15px;
                }
                .ks-abi-artist,
                .ks-abi-title,
                .ks-abma-a
                {
                    font-size: 10px;
                    line-height: 10px;
                }
                .ks-abi-title,
                .ks-abi-stream
                {
                    margin-top: 1px;
                }
                .ks-abi-artist
                {
                    margin-top: 15px;
                }
                .ks-abi-stream
                {
                    font-size: 8px;
                    line-height: 8px;
                }
                .ks-abm-advertising svg,
                .ks-abm-more-streams svg
                {
                    cursor: pointer;
                    margin: 0 0 0; 0;
                }
                .ks-abm-advertising span,
                .ks-abm-more-streams span
                {
                    display: grid;
                }
                .ks-abm-advertising svg
                {
                    height: 33px;
                    width: 33px;
                    margin-bottom: 1px;
                }

                .ks-abm-more-streams svg
                {
                    height: 33px;
                    width: 33px;
                    margin-left: 8px;
                    margin-bottom: 1px;
                }

                .ks-abm-advertising,
                .ks-abm-more-streams
                {
                    margin-top: 22px;
                    margin-bottom: 32px;
                    height: auto;
                }

                .ks-abm-advertising
                {
                    margin-right: 25px;
                }

                .ks-abm-more-streams
                {
                    margin-right: 26px;
                    margin-left: 0px;
                }
                .ks-abma-a:first-child
                {
                    padding: 0 0 0 0;
                    margin: 43px 0 0 0;
                }

                .ks-abma-a:nth-child(2)
                {
                    padding: 0 0 0 0;
                    margin-left: 0px;
                }


                
                /* Webplayer  */

                /*
                .ks-abi-text,
                .ks-abm-advertising,
                .ks-abm-streams,
                .ks-abm-volume
                {
                    display: none;
                }
            
                .ks-ab-meta
                {
                    flex-direction: row-reverse;
                    width: calc(100% - 70px);
                    justify-content: space-between;
                    position: relative;
                }
            
                .ks-abm-more-streams
                {
                    position: absolute;
                    right: calc(50vw - (165px / 2 ));
                    margin-right: 0px;
                }
    
                .konsole-stream[ios-support='true'] .ks-abm-more-streams
                {
                    position: absolute;
                    right: calc(50vw - 120px);
                    margin-right: 0px;
                }
            
                .ks-ab-meta > *
                {
                    height: 70px;
                }
            
                .ks-audio-bar
                {
                    height: 70px
                }
            
                .ks-abi-cover
                {
                    width: 70px;
                    height: 70px;
                    background-size: 70px;
                }
    
                .ks-abm-state
                {
                    padding-right: 10px;
                }
            
                /* Stream Selection Screen */
                .ks-stream-section-wrapper, .ks-select-section-wrapper
                {
                    flex-wrap: wrap;
                    padding: 0 20px;
                }
                .ks-select-section-wrapper
                {
                    flex-wrap: wrap;
                }
                .ks-stream-section-wrapper::-webkit-scrollbar, .ks-select-section-wrapper::-webkit-scrollbar
                {
                    display: none;
                }
                
                .ks-ab-info-small
                {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: calc(0px - 46px);
                    width: 100vw;
                    height: 46px;
                    background: rgba(255, 255, 255, 0.9);
                    border-top: 1px solid rgba(0, 0, 0, 0.12);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                }
            
                .ks-is-radio,
                .ks-is-ta
                {
                    font-size: 15px;
                    line-height: 18px;
                    padding-left: 10px;
                    /* width: 100vw; */
                    padding-right: 20px;
                    display: -webkit-box;
                    -webkit-line-clamp: 1 !important;
                    -webkit-box-orient: vertical;
                    overflow-wrap: break-word;
                    white-space: nowrap;
                }
            
                .ks-is-radio
                {
                    font-weight: 700;
                    padding-top: 5px;
                }
                .ks-stream-section-wrapper
                {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }
                .ks-selector-stream-logo
                {
                    margin: 19px 0 0 0;
                }
                .ks-streams-section-container
                {

                }
                .ks-stream-section-div
                {
                    display: grid;
                    justify-content: center;
                }
    
                .ks-streams-section-headline
                {
                    padding-left: 20px;
                }
            
            }
            
            @keyframes fadeIn
            {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut
            {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @media screen and (max-width: 800px) {
                .ks-stream-section-wrapper
                {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }
            }
            
            @media screen and (max-width: 600px){
                .ks-black
                {
                    display: flex;
                    background-color: #000000;
                    justify-content: center;
                    padding: 0 40px;
                    margin: 0;
                    flex-wrap: wrap;
                }
                .ks-select-button-2
                {
                    margin: 5px 0 20px 10px;
                }
                .ks-select-nologo-button
                {   
                    margin: 5px 0;
                }
                .ks-stream-section-wrapper
                {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }
            }

            @media screen and (max-width: 462px) 
            {
                .ks-selector-spantxt
                {
                    font-size: 21px;
                }      
            }
            
            @media screen and (min-width: 1540px) {
                .ks-ab-meta
                {

                }
                .ks-black
                {
                    display: flex;
                    background-color: #000000;
                    justify-content: center;
                    padding: 0 40px;
                    margin: 0 40px;
                }
            }
            
            @media screen and (max-width: 1660px) and (min-width: 1282px) {
                .ks-audio-bar
                {
                    justify-content: space-between;
                }
            }
            @media screen and (max-width: 1660px) {
                .ks-ab-info
                {
                    width: unset !important;
                }
            }
        </style>
    `;
    
        /*
        // update stream text
        function updateStreamsText() {
            let element = document.querySelector('.ks-abma-a:nth-child(2)');
            if (element) {
                element.textContent = window.innerWidth <= 1281 ? 'STREAMS' : 'MEHR SENDER';
            } else {
                return window.innerWidth <= 1281 ? 'STREAMS' : 'MEHR SENDER';
            }
        }
        document.addEventListener("DOMContentLoaded", updateStreamsText);
        window.addEventListener("resize", updateStreamsText);
        */

        // update player color with max-width
        function handleMediaScreen(event) 
        {
            let audioBar = document.querySelector('.ks-audio-bar');
            if(event.matches){
                KonsoleStream.getColor().then((fetchedColors) => {
                    audioBar.style.background = `linear-gradient(transparent 17.5%, ${fetchedColors['audio-bar']} 17.5%)`;
                })
            } else { 
                KonsoleStream.getColor().then((fetchedColors) => {
                    audioBar.style.background = `linear-gradient(transparent 37.9%, ${fetchedColors['audio-bar']} 37.9%)`;
                })
            }
        }
        let maxWidthQuery = window.matchMedia("(max-width: 1281px)");
        maxWidthQuery.addEventListener('change', handleMediaScreen);

        // BUILD STREAM HTML STREAM ITEMS
        let streamContainer = container.querySelector(".ks-abm-streams");
        for(let index = 0; index < 4 && index < KonsoleStream.Streams.length; index++)
        {
            let stream = KonsoleStream.Streams[index];
            let element = document.createElement("div");
            element.className = `ks-abm-stream${index == 0 ? " animate" : ""}`;
            element.style.backgroundImage = `url(${stream.logo})`;
            element.setAttribute("skey", stream.skey);
            element.addEventListener("click", () => KonsoleStream.play(stream.skey));
            if(KonsoleStream.CurrentStream.skey === KonsoleStream.Streams[index].skey) element.style.display = 'none';
            streamContainer.append(element);
        }

        let selectorStreamContainer = container.querySelector(".ks-selector-streams");

		// Start top Select-Ad
        let preAdText = "";
        let linkTarget = "";
        let linkText = "";
        let sectionContainer = document.createElement("div");
        sectionContainer.className = "ks-stream-section-div";
        sectionContainer.innerHTML = `                
                <div class="ks-select-section-wrapper">
                    <span class="ks-select-text">${preAdText}<a href=${linkTarget} class="ks-select-link" target="_blank">${linkText}</a></span>
                </div>`;
        selectorStreamContainer.append(sectionContainer);
		// Ende top Select-Ad

        for(let index in KonsoleStream.Sections) {
            let section = KonsoleStream.Sections[index];
            let sectionContainer = document.createElement("div");
            sectionContainer.className = "ks-stream-section-div";
            sectionContainer.innerHTML = `<span class="ks-streams-section-headline">${section.section}</span>`;
            let wrapperContainer = KonsoleStream._wrapper_build(section);
            sectionContainer.append(wrapperContainer);
            selectorStreamContainer.append(sectionContainer);
        }

		// Start bottom Select-Ad
        let afterAdText = "";
        let afterAdHeader = "";
        sectionContainer = document.createElement("div");
        sectionContainer.className = "ks-stream-section-div";
        sectionContainer.innerHTML = `                
                <div class="ks-select-section-wrapper">
                    <span class="ks-select-header">${afterAdHeader}</span>
                    <span class="ks-select-text">${afterAdText}</span>
                </div>`;
        selectorStreamContainer.append(sectionContainer);

		sectionContainer = document.createElement("div");
		sectionContainer.className = "ks-stream-section-div";
		let sectionSelectWrapper = document.createElement("div");
		sectionSelectWrapper.className = "ks-select-section-wrapper ks-black";
		sectionContainer.append(sectionSelectWrapper);
        selectorStreamContainer.append(sectionContainer);
		// End bottom black Ad-Banner
		
        // REGISTER VOLUME INPUT EVENTS
        let volumeInput = container.querySelector(".ks-abm-volume input");
        volumeInput.addEventListener("touchmove", () => KonsoleStream._updateVolume());
        volumeInput.addEventListener("mousemove", () => KonsoleStream._updateVolume());
        volumeInput.addEventListener("touchend", () => KonsoleStream._updateVolume());
        volumeInput.addEventListener("mouseup", () => KonsoleStream._updateVolume());
        
        // OPEN STREAM SELECTOR ON CLICK
        container.querySelector(".ks-abm-more-streams").addEventListener("click", () => KonsoleStream.open());

        // TOOGLE PLAY/STOP ON TOGGLE ICON
        container.querySelector(".ks-abm-state").addEventListener("click", () => KonsoleStream.toggle());

        // APPEND CONTAINER TO HTML
        document.body.append(container);
        
        // let adm_element = document.querySelector(".ks-abm-advertising");
        // adm_element.setAttribute("href", KonsoleStream.CurrentStream.newsURL);
        // adm_element.setAttribute("target", "_self");
        // // adm_element.addEventListener("click", () =>
        // // {
        // //     let url = adm_element.getAttribute("url");
        // //     if(url == false) return;
        // //     let a = document.createElement("a");
        // //     a.href = url;
        // //     a.target = "_self";
        // //     a.click();
        // // });

        let resizeInfo = () =>
        {
            let info = container.querySelector(".ks-ab-info");
            let meta = container.querySelector(".ks-ab-meta");
            //info.style.width = `calc((100vw - ${meta.clientWidth}px) / 2)`;
        };
        container.addEventListener("resize", resizeInfo);
        resizeInfo();


        // START AND INTEVAL(30s) STREAM META DATA
        await KonsoleStream._downloadMetas();
        KonsoleStream.MetaInerval = setInterval(KonsoleStream._downloadMetas, 30000);
    }

    // wrapper_build function for customer
    static _wrapper_build(section)
    {
        let wrapperContainer = document.createElement("div");
        wrapperContainer.className = "ks-stream-section-wrapper";
        for(let index in section.items)
        {
            let stream = KonsoleStream.Streams.find(stream => stream.skey == section.items[index]);
            let wrapperItem = document.createElement("div");
            wrapperItem.className = "ks-streams-section-container";

            const streamDiv = document.createElement("div");
            streamDiv.className = "ks-selector-stream-logo animButton";
            streamDiv.style.backgroundImage=`url('${stream.logo}')`;
            streamDiv.innerHTML = `
                    <div class="ks-selector-stream-svg-bg"></div>
                    <div class="ks-selector-stream-svg-overlay">
                        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg" class="ks-selector-stream-svg">
                            <circle cx="33" cy="33" r="33" fill="#77B82A"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.8024 47.4052C24.4706 48.2463 22.7344 47.2893 22.7344 45.7142V19.0287C22.7344 17.4536 24.4706 16.4966 25.8024 17.3377L46.9285 30.6805C48.1711 31.4653 48.1711 33.2776 46.9284 34.0624L25.8024 47.4052Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="ks-selector-stream-svg-bg-active stream_${stream.skey}">
                        <svg width="53" height="21" viewBox="0 0 53 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="53" height="21" rx="10.5" fill="#77B82A"/>
                            <path d="M10.9766 15H6.13086V6.43359H10.9766V7.61719H7.53125V9.94922H10.7598V11.1211H7.53125V13.8105H10.9766V15ZM17.041 13.1543C17.041 13.7871 16.8105 14.2734 16.3496 14.6133C15.8887 14.9492 15.2285 15.1172 14.3691 15.1172C13.5059 15.1172 12.8125 14.9863 12.2891 14.7246V13.5352C13.0508 13.8867 13.7598 14.0625 14.416 14.0625C15.2637 14.0625 15.6875 13.8066 15.6875 13.2949C15.6875 13.1309 15.6406 12.9941 15.5469 12.8848C15.4531 12.7754 15.2988 12.6621 15.084 12.5449C14.8691 12.4277 14.5703 12.2949 14.1875 12.1465C13.4414 11.8574 12.9355 11.5684 12.6699 11.2793C12.4082 10.9902 12.2773 10.6152 12.2773 10.1543C12.2773 9.59961 12.5 9.16992 12.9453 8.86523C13.3945 8.55664 14.0039 8.40234 14.7734 8.40234C15.5352 8.40234 16.2559 8.55664 16.9355 8.86523L16.4902 9.90234C15.791 9.61328 15.2031 9.46875 14.7266 9.46875C14 9.46875 13.6367 9.67578 13.6367 10.0898C13.6367 10.293 13.7305 10.4648 13.918 10.6055C14.1094 10.7461 14.5234 10.9395 15.1602 11.1855C15.6953 11.3926 16.084 11.582 16.3262 11.7539C16.5684 11.9258 16.748 12.125 16.8652 12.3516C16.9824 12.5742 17.041 12.8418 17.041 13.1543ZM23.0293 15H21.6523V5.88281H23.0293V15ZM29.0586 15L28.7832 14.0977H28.7363C28.4238 14.4922 28.1094 14.7617 27.793 14.9062C27.4766 15.0469 27.0703 15.1172 26.5742 15.1172C25.9375 15.1172 25.4395 14.9453 25.0801 14.6016C24.7246 14.2578 24.5469 13.7715 24.5469 13.1426C24.5469 12.4746 24.7949 11.9707 25.291 11.6309C25.7871 11.291 26.543 11.1055 27.5586 11.0742L28.6777 11.0391V10.6934C28.6777 10.2793 28.5801 9.9707 28.3848 9.76758C28.1934 9.56055 27.8945 9.45703 27.4883 9.45703C27.1562 9.45703 26.8379 9.50586 26.5332 9.60352C26.2285 9.70117 25.9355 9.81641 25.6543 9.94922L25.209 8.96484C25.5605 8.78125 25.9453 8.64258 26.3633 8.54883C26.7812 8.45117 27.1758 8.40234 27.5469 8.40234C28.3711 8.40234 28.9922 8.58203 29.4102 8.94141C29.832 9.30078 30.043 9.86523 30.043 10.6348V15H29.0586ZM27.0078 14.0625C27.5078 14.0625 27.9082 13.9238 28.209 13.6465C28.5137 13.3652 28.666 12.9727 28.666 12.4688V11.9062L27.834 11.9414C27.1855 11.9648 26.7129 12.0742 26.416 12.2695C26.123 12.4609 25.9766 12.7559 25.9766 13.1543C25.9766 13.4434 26.0625 13.668 26.2344 13.8281C26.4062 13.9844 26.6641 14.0625 27.0078 14.0625ZM25.6719 6.80273C25.6719 6.56055 25.7363 6.38672 25.8652 6.28125C25.998 6.17188 26.1582 6.11719 26.3457 6.11719C26.5527 6.11719 26.7168 6.17773 26.8379 6.29883C26.9629 6.41992 27.0254 6.58789 27.0254 6.80273C27.0254 7.00977 26.9629 7.17578 26.8379 7.30078C26.7129 7.42578 26.5488 7.48828 26.3457 7.48828C26.1582 7.48828 25.998 7.43164 25.8652 7.31836C25.7363 7.20508 25.6719 7.0332 25.6719 6.80273ZM27.9746 6.80273C27.9746 6.56055 28.0391 6.38672 28.168 6.28125C28.3008 6.17188 28.4609 6.11719 28.6484 6.11719C28.8555 6.11719 29.0215 6.17773 29.1465 6.29883C29.2715 6.41992 29.334 6.58789 29.334 6.80273C29.334 7.01367 29.2695 7.18164 29.1406 7.30664C29.0117 7.42773 28.8477 7.48828 28.6484 7.48828C28.4609 7.48828 28.3008 7.43164 28.168 7.31836C28.0391 7.20508 27.9746 7.0332 27.9746 6.80273ZM36.5352 15L36.3418 14.1504H36.2715C36.0801 14.4512 35.8066 14.6875 35.4512 14.8594C35.0996 15.0312 34.6973 15.1172 34.2441 15.1172C33.459 15.1172 32.873 14.9219 32.4863 14.5312C32.0996 14.1406 31.9062 13.5488 31.9062 12.7559V8.51953H33.2949V12.5156C33.2949 13.0117 33.3965 13.3848 33.5996 13.6348C33.8027 13.8809 34.1211 14.0039 34.5547 14.0039C35.1328 14.0039 35.5566 13.832 35.8262 13.4883C36.0996 13.1406 36.2363 12.5605 36.2363 11.748V8.51953H37.6191V15H36.5352ZM42.834 9.5625H41.252V15H39.8691V9.5625H38.8027V8.91797L39.8691 8.49609V8.07422C39.8691 7.30859 40.0488 6.74219 40.4082 6.375C40.7676 6.00391 41.3164 5.81836 42.0547 5.81836C42.5391 5.81836 43.0156 5.89844 43.4844 6.05859L43.1211 7.10156C42.7812 6.99219 42.457 6.9375 42.1484 6.9375C41.8359 6.9375 41.6074 7.03516 41.4629 7.23047C41.3223 7.42188 41.252 7.71094 41.252 8.09766V8.51953H42.834V9.5625ZM46.3555 14.0039C46.6914 14.0039 47.0273 13.9512 47.3633 13.8457V14.8828C47.2109 14.9492 47.0137 15.0039 46.7715 15.0469C46.5332 15.0938 46.2852 15.1172 46.0273 15.1172C44.7227 15.1172 44.0703 14.4297 44.0703 13.0547V9.5625H43.1855V8.95312L44.1348 8.44922L44.6035 7.07812H45.4531V8.51953H47.2988V9.5625H45.4531V13.0312C45.4531 13.3633 45.5352 13.6094 45.6992 13.7695C45.8672 13.9258 46.0859 14.0039 46.3555 14.0039Z" fill="white"/>
                        </svg>
                    </div>
            `;
            streamDiv.onclick = () => {
                KonsoleStream.play(`${stream.skey}`);
                if (window.matchMedia("(max-width: 1281px)").matches) {
                    let audioBar = document.querySelector('.ks-audio-bar');
                    KonsoleStream.getColor().then((fetchedColors) => {
                        audioBar.style.background = `linear-gradient(transparent 17.5%, ${fetchedColors['audio-bar']} 17.5%)`;
                    });
                } else {
                    let audioBar = document.querySelector('.ks-audio-bar');
                    KonsoleStream.getColor().then((fetchedColors) => {
                        audioBar.style.background = `linear-gradient(transparent 37.9%, ${fetchedColors['audio-bar']} 37.9%)`;
                    });
                }
            };
            
            streamDiv.ontouchstart = () => {
                streamDiv.querySelector(".ks-selector-stream-svg-overlay").style.display = "flex";
                streamDiv.querySelector(".ks-selector-stream-svg-bg").style.display = "flex";
            };

            streamDiv.ontouchend = () => {
                streamDiv.querySelector(".ks-selector-stream-svg-overlay").style.display = "none";
                streamDiv.querySelector(".ks-selector-stream-svg-bg").style.display = "none";
            }

            streamDiv.ontouchcancel = () => {
                streamDiv.querySelector(".ks-selector-stream-svg-overlay").style.display = "none";
                streamDiv.querySelector(".ks-selector-stream-svg-bg").style.display = "none";
            }

            const span = document.createElement("span");
            span.className = "ks-selector-stream-span";
            span.innerHTML = `${stream.title}`
            wrapperItem.append(streamDiv);
            wrapperItem.append(span);
            wrapperContainer.append(wrapperItem);
        }
        return wrapperContainer;
    } 

    // Player color selection
    static async getColor() 
    {
        let request = await fetch(`${KonsoleStream._backendURL}colors.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                skey: KonsoleStream.CurrentStream.skey
            })
        });
        if(request.status != 200){
            console.error("Server is not reachable", request);
            return;
        }
        let response = await request.json();
        return response;
    }

    static async changeColor()
    {
        let fetchedColors = await KonsoleStream.getColor();
        let audioBar = document.querySelector('.ks-audio-bar');
        let artistElement = document.querySelector('.ks-abi-artist');
        let titleElement = document.querySelector('.ks-abi-title');
        let streamElement = document.querySelector('.ks-abi-stream');
        let playCircle = document.querySelector('.ks-abms-play circle');
        let playPath = document.querySelectorAll('.ks-abms-play path');
        let stopCircle = document.querySelector('.ks-abms-stop circle');
        let stopPath = document.querySelectorAll('.ks-abms-stop path');
        let stopRect = document.querySelectorAll('.ks-abms-stop rect');
        let abmAdvSpan = document.querySelector('.ks-abm-advertising span');
        let abmStreamsSpan = document.querySelector('.ks-abm-more-streams span');
        let abmAdvPath = document.querySelectorAll('.ks-abm-advertising path');
        let abmStreamsPath = document.querySelectorAll('.ks-abm-more-streams path');
        let streamsTxt = document.querySelector('.ks-abm-streams-txt');
        let abmaA = document.querySelectorAll('.ks-abma-a');
        let volumeSvg = document.querySelector('.ks-abm-volume path');
        let volumeInput = document.querySelector('.ks-abm-volume input');
        let selectorStreamSvgs = document.querySelectorAll('.ks-selector-stream-svg');
        let streamsBackground = document.querySelectorAll('.ks-selector-streams, .ks-selector-headline, .ks-selector-btn, .konsole-stream-selector');
        let streamsAllTxt = document.querySelectorAll('.ks-selector-spantxt', '.ks-selector-btntxt', '.ks-streams-section-headline', '.ks-selector-stream-span')
        let backButton = document.querySelector('.ks-sh-svg path')


        abmAdvPath.forEach(element => {element.style.fill = fetchedColors['icons']});
        abmStreamsPath.forEach(element => {element.style.fill = fetchedColors['icons']});
        playPath.forEach(element => {element.style.fill = fetchedColors['play-color']});
        stopPath.forEach(element => {element.style.fill = fetchedColors['play-color']});
        stopRect.forEach(element => {element.style.fill = fetchedColors['play-color']});
        abmaA.forEach(element => {element.style.color = fetchedColors['icons']});
        selectorStreamSvgs.forEach(element => {
            element.style.setProperty('--playBackground', fetchedColors['play-background']);
            element.style.setProperty('--playColor', fetchedColors['play-color']);
          });
        streamsBackground.forEach(element => {element.style.background = fetchedColors['streams-background']});
        streamsAllTxt.forEach(element => {element.style.color = fetchedColors['streams-txt']});

        //audioBar.style.background = `linear-gradient(transparent 37.9%, ${fetchedColors['audio-bar']} 37.9%)`;
        artistElement.style.color = titleElement.style.color = fetchedColors['artist-title-streams'];
        streamElement.style.color = fetchedColors['stream'];
        playCircle.style.fill = fetchedColors['play-background'];
        stopCircle.style.fill = fetchedColors['play-background'];
        abmAdvSpan.style.fill = abmStreamsSpan.style.fill = fetchedColors['icons'];
        streamsTxt.style.color = fetchedColors['artist-title-streams'];
        volumeSvg.style.fill = fetchedColors['volume-icon'];
        volumeInput.style.setProperty('--volumeCircle', fetchedColors['volume-circle']);
        volumeInput.style.setProperty('--volumeInputColor', fetchedColors['volume-input-color']);
        volumeInput.style.setProperty('--volumeSvgBackground', fetchedColors['volume-svg-background']);
        backButton.style.fill = fetchedColors['streams-txt'];
    }

    static async _downloadStreams() 
    {
        try {
             let request = await fetch(`${KonsoleStream._backendURL}streams.php`);
            if(request.status != 200)
            {
                console.error("Server is not reachable", request);
                return
            }
            let response = await request.json();

            KonsoleStream.Streams = response.streams;
            KonsoleStream.Sections = response.sections;
            KonsoleStream.CurrentStream = KonsoleStream.Streams.find(s => s.initStream == true);
            if(KonsoleStream.CurrentStream == undefined)
            {
                console.warn("InitStream is not set. Use first stream");
                if(KonsoleStream.Streams.length == 0)
                {
                    console.error("StreamList is empty.");
                }
                else
                {
                    KonsoleStream.CurrentStream = KonsoleStream.Streams[0];
                }
            }
        } catch (error) {
            console.error("Error on fetch stream-data", error);
            return
        }
    }
    static async _downloadMetas()
    {
        let stream = KonsoleStream.preloadedStream ? KonsoleStream.preloadedStream : KonsoleStream.CurrentStream;
        try {
            let request = await fetch(`https://api.streamabc.net/metadata/channel/${stream.skey}.json`);
            if(request.status != 200) throw new Error("Streammeta is not available");
            let response = await request.json();

            document.querySelector(".ks-abi-artist").innerHTML = response.artist || "keine Daten verfügbar";
            document.querySelector(".ks-abi-title").innerHTML = response.song || "keine Daten verfügbar";
            document.querySelector(".ks-abi-stream").innerHTML = stream.title || "keine Daten verfügbar";
            document.querySelector(".ks-abi-cover").style = `background-image: url('${response.cover || stream.logo}')`;
            /*
            // CHECK IF CONTENT IS OVERFLOWING
            document.querySelectorAll(".text-break").forEach(element =>
            {
                if(element.parentElement.clientWidth < element.clientWidth)
                {
                    element.classList.add("marquee");
                }
                else
                {
                    element.classList.remove("marquee");
                }
                
            });
        */
        } catch (error) {
            console.error(error);
            document.querySelector(".ks-abi-artist").innerHTML = "keine Daten verfügbar";
            document.querySelector(".ks-abi-title").innerHTML = "keine Daten verfügbar";
            document.querySelector(".ks-abi-stream").innerHTML = "keine Daten verfügbar";
            document.querySelector(".ks-abi-cover").style = `background-image: url('${stream.logo}')`;
        }
    }

    static async open() {
        let container = document.querySelector(".konsole-stream");
        let isOpen = container.getAttribute("selector-open") == "true";
        if(isOpen)
        {
            document.body.classList.toggle('ks-hidden', false);
            await Fade.hide(document.querySelector(".konsole-stream-selector"));
        }
        else
        {
            document.body.classList.toggle('ks-hidden', true);
            await Fade.show(document.querySelector(".konsole-stream-selector"));
        }
        container.setAttribute("selector-open", isOpen ? "false" : "true");
    }
    static async close() {
        document.body.classList.toggle('ks-hidden', false);
        await Fade.hide(document.querySelector(".konsole-stream-selector"));
        document.querySelector(".konsole-stream").setAttribute("selector-open", "false");
    }

    static streams()
    {
        return KonsoleStream.Streams;
    }
    static async setStream(skey)
    {
        let stream = KonsoleStream.Streams.find(stream => stream.skey == skey);
        if(stream === undefined)
        {
            throw new Error("Stream not found: " + skey);
        }
        KonsoleStream.preloadedStream = stream;
        KonsoleStream.changeColor();
        document.querySelector(".ks-abm-state").setAttribute("state", "0");
        KonsoleStream._downloadMetas();
        let barStreamElements = document.querySelectorAll(".ks-abm-stream")
        document.querySelectorAll(`.ks-abm-stream`).forEach(element => element.classList.remove("animate"));
        let activeElement = document.querySelector(`.ks-abm-stream[skey="${KonsoleStream.preloadedStream.skey}"]`);

        if(activeElement)
        {
            activeElement.classList.add("animate");
            activeElement.style.display = 'none';
            oldElement.style.display = 'block';
        }
        else
        {
            let toChange = barStreamElements[3];
            toChange.style = `background-image:url(${KonsoleStream.preloadedStream.logo})`;
            toChange.setAttribute("skey", skey);
            toChange.addEventListener("click", () => KonsoleStream.play(KonsoleStream.preloadedStream.skey), {once: true});
            toChange.classList.add("animate");
        }
        KonsoleStream._setActiveStreamInSelection(KonsoleStream.preloadedStream.skey);

    }
    static async play(skey) 
    {
        KonsoleStream.preloadedStream = undefined;
        let stateElement = document.querySelector(".ks-abm-state");
        let oldElement = document.querySelector(`.ks-abm-stream[skey="${KonsoleStream.CurrentStream.skey}"]`);
        if(KonsoleStream.CurrentStream.skey == skey && stateElement.getAttribute("state") == "1")
        {
            KonsoleStream.stop();
            return;
        }
        
        let volume = 1.0 / 100.0 * KonsoleStream.volume();
        if(KonsoleStream.audio)
        {
            KonsoleStream.stop();
            let lastAudio = KonsoleStream.audio;
            KonsoleStream.audio = undefined;
            delete KonsoleStream.audio;
            lastAudio.src = "";
        }

        let nextStream = KonsoleStream.Streams.find(stream => stream.skey == skey);
        if(nextStream == undefined) throw new Error("Nextstream not found:", skey);

        KonsoleStream.CurrentStream = nextStream;
        KonsoleStream.audio = new Audio(await KonsoleStream._buildAudioURL(nextStream.audioUrl));
        KonsoleStream.audio.volume = volume;
        KonsoleStream.audio.play();
        KonsoleStream.changeColor();

        // document.querySelector(".ks-abm-advertising").setAttribute("url", KonsoleStream.CurrentStream.newsURL);

        stateElement.setAttribute("state", "1");
        KonsoleStream._downloadMetas();
        let barStreamElements = document.querySelectorAll(".ks-abm-stream")
        document.querySelectorAll(`.ks-abm-stream`).forEach(element => element.classList.remove("animate"));
        let activeElement = document.querySelector(`.ks-abm-stream[skey="${KonsoleStream.CurrentStream.skey}"]`);

        if(activeElement)
        {
            activeElement.classList.add("animate");
            activeElement.style.display = 'none';
            oldElement.style.display = 'block';
        }
        else
        {
            let toChange = barStreamElements[3];
            toChange.style = `background-image:url(${KonsoleStream.CurrentStream.logo})`;
            toChange.setAttribute("skey", skey);
            toChange.addEventListener("click", () => KonsoleStream.play(KonsoleStream.CurrentStream.skey), {once: true});
            toChange.classList.add("animate");
        }
        KonsoleStream._setActiveStreamInSelection(KonsoleStream.CurrentStream.skey);
    }

    static stop() {
        KonsoleStream.audio.pause();
        document.querySelector(".ks-abm-state").setAttribute("state", "0");
        KonsoleStream._setActiveStreamInSelection("");
    }
    static async toggle()
    {
        let stateElement = document.querySelector(".ks-abm-state");
        if(stateElement.getAttribute("state") == "0")
        {
            if(KonsoleStream.audio && KonsoleStream.preloadedStream === undefined)
            {
                KonsoleStream.audio.play();
                stateElement.setAttribute("state", "1");
            }
            else
            {
                if(KonsoleStream.preloadedStream)
                {
                    KonsoleStream.CurrentStream = KonsoleStream.preloadedStream;
                }
                KonsoleStream.audio = new Audio(await KonsoleStream._buildAudioURL(KonsoleStream.CurrentStream.audioUrl));
                KonsoleStream.audio.volume = 0.5;
                KonsoleStream.audio.play();
                stateElement.setAttribute("state", "1");
            }
        }
        else 
        {
            KonsoleStream.stop();
        }
    }
    static _setActiveStreamInSelection(skey)
    {
        document.querySelectorAll(".ks-selector-stream-svg-bg-active").forEach(item => item.classList.remove("active"));
        if(skey == false || skey == null || document.querySelector(".konsole-stream").getAttribute("selector-open")) return;
        document.querySelector(`.stream_${skey}`).classList.add("active");
    }
    
    static state(skey=undefined) {
        if(skey != undefined && KonsoleStream.CurrentStream.skey != skey)
        {
            return false;
        }
        return document.querySelector(".ks-abm-state").getAttribute("state") == "1";
    }

    static volume(percent=undefined)
    {
        if(percent == undefined)
        {
            if(KonsoleStream.audio)
            {
                return KonsoleStream.audio.volume * 100;
            }
            else
            {
                return 50;
            }
        }
        if(percent < 0 || percent > 100) throw new Error("Volume must be between 0-100:", percent);

        let input = document.querySelector(".ks-abm-volume input");
        input.style.background = `linear-gradient(to right, var(--volumeInputColor) 0%, var(--volumeInputColor) ${percent}%, var(--volumeSvgBackground) ${percent}%, var(--volumeSvgBackground) 100%)`;
        input.value = percent;
        if(KonsoleStream.audio) KonsoleStream.audio.volume = 1.0 / 100.0 * percent;

    }
    static _updateVolume()
    {
        let input = document.querySelector(".ks-abm-volume input");
        input.style.background = `linear-gradient(to right, var(--volumeInputColor) 0%, var(--volumeInputColor) ${input.value}%, var(--volumeSvgBackground) ${input.value}%, var(--volumeSvgBackground) 100%)`;
        if(KonsoleStream.audio) KonsoleStream.audio.volume = 1.0 / 100.0 * input.value;
    }
    static _getTCF()
    {
        return new Promise((resolve, reject) => {
            __tcfapi('addEventListener', 2, (tcData,success) =>
            {
                if(success && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete'))
                {
                    resolve(tcData.tcString);
                }
                else
                {
                    reject();
                }
            });
        });
    }
    static async _buildAudioURL(url)
    {
        return url;
        let packet = {
            "aw_0_req.userConsentV2": await KonsoleStream._getTCF()
        };
        if(typeof UC_UI !== "undefined")
        {
            let adswizz = UC_UI.getTCFVendors().find(v => v.id === 507).consent;
            if(adswizz === true)
            {
                packet.listenerid = await KonsoleStream._getUUID();
            }
        }
        let query = new URLSearchParams(packet).toString() + "&" + new Date().getTime();
        let customURL = url + `${url.includes("?") ? "&":"?"}${query}`;
        console.log(customURL);
        return window.etm.appendStreamParam(customURL);
    }
    static async _getUUID()
    {
        if(typeof com_adswizz_synchro_listenerid === "string")
        {
            return com_adswizz_synchro_listenerid;
        }
        if(Cookies.has("listener_uuid"))
        {
            return Cookies.get("listener_uuid");
        }
        let uuid = crypto.randomUUID();
        Cookies.set("listener_uuid", uuid, new Date(new Date().getTime() + 31536000000));
        return uuid;
    }
}

class Fade
{
    static hide(element, time=400)
    {
        return new Promise((resolve, reject) =>
        {
            let onEnd = () =>
            {
                element.removeEventListener("animationend", onEnd);
                element.style.display = "none";
                resolve();
            };
            element.addEventListener("animationend", onEnd);
            element.style.display = 'block';
            element.style.animation = `fadeOut ${time / 1000}s linear`;
        });
    }
    static show(element, time=400) {
        return new Promise((resolve, reject) =>
        {
            let onEnd = () =>
            {
                element.removeEventListener("animationend", onEnd);
                resolve();
            };
            element.addEventListener("animationend", onEnd);
            element.style.display = 'block';
            element.style.animation = `fadeIn ${time / 1000}s linear`;
        });
    }
}
class Cookies {
    static get(key) {
        let name = key + "=";
        let decoded = decodeURIComponent(document.cookie);
        let split = decoded.split(";");
        for(var i = 0; i <split.length; i++) {
            let c = split[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return null;
    }
    static set(key, value, date) {
        if(date === undefined) {
            date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        }
        else if(typeof date === "number") date = new Date(date * 1000);
        document.cookie = `${key}=${value};Expires=${date.toUTCString()};Path=/;SameSite=None;Secure=true`;
    }
    static remove(key) {
        Cookies.set(key, "", 0);
    }
    static has(key) {
        return Cookies.get(key) != null;
    }
}