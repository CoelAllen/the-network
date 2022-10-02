import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { logger } from "../utils/Logger.js"
import { SandboxApi } from "./AxiosService.js"

class AdsService{
  async getAds(){
    const res = await SandboxApi.get('api/ads')
    logger.log(res.data, '[getAds]')
    AppState.ads = res.data
  }
}
export const adsService = new AdsService()