export const DEV_DID_SERVER_URL = "https://didapi.memolabs.org/did"

export const Test_DID_SERVER_URL = "https://testdidapi.memolabs.org/did"

export const PRODUCT_DID_SERVER_URL = "https://prodidapi.memolabs.org/did"

export const TEST_AIRDROP_BACKEND_URL = "https://apapitest.memoscan.org/api"

export const PRODUCT_AIRDROP_BACKEND_URL = "https://apapi.memoscan.org/api"


export const DID_SERVER_URL = DEV_DID_SERVER_URL;
export const AIRDROP_BACKEND_URL = TEST_AIRDROP_BACKEND_URL;

export const API_URL = {
    "DID_CREATE": DID_SERVER_URL + "/create",
    "DID_CREATE_ADMIN": DID_SERVER_URL + "/createadmin",
    "DID_INFO": DID_SERVER_URL + "/info",
    "DID_EXIST": DID_SERVER_URL + "/exist",
    "DID_CREATE_MSG": DID_SERVER_URL + "/createsigmsg",

    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/record/add",
    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/user/wallet/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/user/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/points/rank",
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/invite/bind",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/record/list"
}