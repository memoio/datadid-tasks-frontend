export const DEV_DID_SERVER_URL = "https://didapi.memolabs.org/did"

export const Test_DID_SERVER_URL = "https://testdidapi.memolabs.org/did"

export const PRODUCT_DID_SERVER_URL = "https://prodidapi.memolabs.org/did"

export const TEST_AIRDROP_BACKEND_URL = "https://apapitest.memoscan.org/api"

export const PRODUCT_AIRDROP_BACKEND_URL = "https://apapi.memoscan.org/api"

export const DEV_BACKEND_URL = "http://localhost:8080"

export const PRODUCT_BACKEND_URL = "https://data-be.metamemo.one"

export const BACKEND_URL = process.env.BACKEND_URL;

export const DID_SERVER_URL = process.env.DID_SERVER_URL;
export const AIRDROP_BACKEND_URL = process.env.AIRDROP_BACKEND_URL;

export const API_URL = {
    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/record/add",

    "BACKEND_OAT_STATUS": BACKEND_URL + "/oat/status",
    "BACKEND_OAT_VERIFY": BACKEND_URL + "/oat/verify",

    "BACKEND_AIRDROP_BIND": BACKEND_URL + "/data/bind", 
    "BACKEND_AIRDROP_INFO": BACKEND_URL + "/data/info",
    "BACKEND_AIRDROP_RANK": BACKEND_URL + "/data/rank",
    "BACKEND_AIRDROP_INVITE_BIND": BACKEND_URL + "/data/invite/bind",
    "BACKEND_AIRDROP_INVITE_LIST": BACKEND_URL + "/data/invite/list",
    "BACKEND_AIRDROP_RECORD_LIST": BACKEND_URL + "/data/record/list",
    "BACKEND_AIRDROP_RECORD_ADD": BACKEND_URL + "/data/record/add",

    "BACKEND_DID_CREATEADMIN": BACKEND_URL + "/did/createadmin",
    "BACKEND_DID_INFO": BACKEND_URL + "/did/info",

    "BACKEND_ACTIVITY_BIND_CHANNEL": BACKEND_URL + "/activity/bind/channel",
    "BACKEND_ACTIVITY_BIND_ACTIVITY": BACKEND_URL + "/activity/bind/activity",
} 