import { GameHelper } from "../helpers/GameHelper";
import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "../models/eft/common/tables/IRepeatableQuests";
import { IGameConfigResponse } from "../models/eft/game/IGameConfigResponse";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { ICoreConfig } from "../models/spt/config/ICoreConfig";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { LocaleService } from "../services/LocaleService";
import { Watermark } from "../utils/Watermark";
export declare class GameController {
    protected logger: ILogger;
    protected watermark: Watermark;
    protected httpServerHelper: HttpServerHelper;
    protected localeService: LocaleService;
    protected profileHelper: ProfileHelper;
    protected gameHelper: GameHelper;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    protected coreConfig: ICoreConfig;
    constructor(logger: ILogger, watermark: Watermark, httpServerHelper: HttpServerHelper, localeService: LocaleService, profileHelper: ProfileHelper, gameHelper: GameHelper, configServer: ConfigServer);
    gameStart(_url: string, _info: IEmptyRequestData, sessionID: string): void;
    protected addMissingBonusesProperty(pmcProfile: IPmcData): void;
    protected addMissingRepeatableQuestsProperty(pmcProfile: IPmcData): void;
    protected addMissingWeaponRepairSkill(pmcProfile: IPmcData): void;
    protected addMissingAkiVersionTagToProfile(fullProfile: IAkiProfile): void;
    /**
     * In 18876 bsg changed the pockets tplid to be one that has 3 additional special slots
     * @param pmcProfile
     */
    protected updateProfilePocketsToNewId(pmcProfile: IPmcData): void;
    protected addMissingArmorRepairSkill(pmcProfile: IPmcData): void;
    protected fixNullTraderSalesSums(pmcProfile: IPmcData): void;
    protected removeDanglingBackendCounters(pmcProfile: IPmcData): void;
    getGameConfig(sessionID: string): IGameConfigResponse;
    getServer(): any[];
    protected getActiveRepeatableQuests(repeatableQuests: IPmcDataRepeatableQuest[]): IRepeatableQuest[];
}
