import bodyParser from "body-parser";
import { Application } from "express";
import { unzipSync } from "zlib";
import { Module } from "./module";
import iconv from "iconv-lite";
import { Config } from "./config";

// Import Proto
import * as wm from "./wmmt/wm5.proto";

// Import Util
import * as common from "./modules/util/common";

// TODO: Move this into the config
const STARTUP_URI = `https://${Config.getConfig().serverIp || "localhost"}:9002`;
const STARTUP_HOST = `${Config.getConfig().serverIp || "localhost"}:9002`;

export default class AllnetModule extends Module {
    register(app: Application): void {
        app.use(bodyParser.raw({
            type: '*/*'
        }));

        app.use("/sys/servlet/PowerOn", function(req, res, next) {
            console.log('amauthd');

            if (req.method !== "POST") {
                return res.status(405).end();
            }
        
            if (!req.is("application/x-www-form-urlencoded")) {
                return next();
            }
        
            const base64 = req.body.toString('ascii');
            const zbytes = Buffer.from(base64, "base64");
            const bytes = unzipSync(Uint8Array.from(zbytes));
            const str = bytes.toString("ascii").trim();
        
            const kvps = str.split("&");
            const reqParams: any = {};
        
            // Keys and values are not URL-escaped
        
            kvps.forEach(kvp => {
                const [key, val] = kvp.split("=");
        
                reqParams[key] = val;
            });
        
            const send_ = res.send;
        
            req.body = reqParams;
            res.send = resParams => {
                const str =
                    Object.entries(resParams)
                        .map(([key, val]) => key + "=" + val)
                        .join("&") + "\n";
        
                res.set("content-type", "text/plain");
        
                const bin = iconv.encode(str, "shift_jis");
        
                return send_.apply(res, [bin]);
            };
        
            return next();
        });
        
        app.post("/sys/servlet/PowerOn", function(req, res) {
            console.log('ALL.net: Startup request');
            
            // Cut milliseconds out of ISO timestamp
        
            const now = new Date();
            const adjusted = now;

            let shopName = Config.getConfig().shopName;
            let shopNick = Config.getConfig().shopNickname;
            let regionName = Config.getConfig().regionName;
            let placeId = Config.getConfig().placeId;
            let country = Config.getConfig().country;
            let regionId = Config.getConfig().regionId;

            // TODO: Implement board authentication here.
        
            const resParams = {
                stat: 1,
                uri: STARTUP_URI,
                host: STARTUP_HOST,
                place_id: placeId,
                name: shopName,
                nickname: shopNick,
                region0: regionId,
                region_name0: regionName,
                region_name1: "X",
                region_name2: "Y",
                region_name3: "Z",
                country: country,
                allnet_id: "456",
                timezone: "002:00",
                setting: "",
                year: adjusted.getFullYear(),
                month: adjusted.getMonth() + 1, // I hate JS
                day: adjusted.getDate(),
                hour: adjusted.getHours(),
                minute: adjusted.getMinutes(),
                second: adjusted.getSeconds(),
                res_class: "PowerOnResponseVer2",
                token: req.body.token,
            };
                
            res.send(resParams);
        });

        // Register System Info - sent by cabinet during ALL.Net startup sequence
        app.post('/method/register_system_info', (req, res) => {
            console.log('ALL.net: register_system_info');

            // Get current timestamps
            let now = Math.floor(new Date().getTime() / 1000);

            // Response data
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                regionId: 1,
                placeId: "1",
                carCampaignStartAt: now,
                carCampaignEndAt: now + (60 * 60 * 24 * 365), // 1 year from now
                teamSuspensionAnnouncementStartAt: now,
                teamSuspensionStartAt: now,
                faceRecognitionPermitted: false,
                featureVersion: {
                    version: 1,
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    pluses: 0,
                    releaseAt: now,
                },
                latestCompetitionId: 0,
                competitionSchedule: {
                    competitionId: 0,
                    qualifyingPeriodStartAt: now,
                    qualifyingPeriodCloseAt: now,
                    competitionStartAt: now,
                    competitionCloseAt: now,
                    competitionEndAt: now,
                    lengthOfPeriod: 0,
                    lengthOfInterval: 0,
                    area: 0,
                    minigamePatternId: 0,
                },
                specialGhostSchedule: {
                    startAt: now,
                    endAt: now + (60 * 60 * 24 * 365),
                    announcementEndAt: now + (60 * 60 * 24 * 365),
                },
            };

            // Encode the response
            let message = wm.wm5.protobuf.RegisterSystemInfoResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
        });
    }
}
