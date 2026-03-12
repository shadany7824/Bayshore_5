import { Application } from "express";
import { Module } from "../module";

// Import Proto
import * as wm from "../wmmt/wm5.proto";
import * as svc from "../wmmt/service.proto";

// Import Util
import * as common from "./util/common";


export default class StubModule extends Module {
    register(app: Application): void {

        // lock_crown - called after ghost battle to lock a crown
        app.post('/method/lock_crown', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.LockCrownResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // register_system_stats - periodic cabinet stats report
        app.post('/method/register_system_stats', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.RegisterSystemStatsResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // register_ghost_trail - saves ghost trail after ghost battle
        app.post('/method/register_ghost_trail', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.RegisterGhostTrailResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // register_opponent_ghost - registers opponent ghost for next battle
        app.post('/method/register_opponent_ghost', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.RegisterOpponentGhostResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // ping - keep-alive ping from cabinet
        app.post('/method/ping', (req, res) => {
            let body = svc.wm5.protobuf.PingRequest.decode(req.body);
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                pong: body.ping,
            };
            let message = svc.wm5.protobuf.PingResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // update_user_lock - locks/unlocks user account
        app.post('/method/update_user_lock', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.UpdateUserLockResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // load_drive_information - loads notices/shop info shown on drive screen
        app.post('/method/load_drive_information', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                noticeWindow: [],
                noticeWindowMessage: [],
                shopGrades: [],
            };
            let message = svc.wm5.protobuf.LoadDriveInformationResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // load_ghost_battle_history - loads ghost battle history
        app.post('/method/load_ghost_battle_history', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                cars: [],
            };
            let message = svc.wm5.protobuf.LoadGhostBattleHistoryResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // load_ghost_competition_info - loads OCM competition info
        app.post('/method/load_ghost_competition_info', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                periodId: 0,
                closed: true,
                brakingPoint: 0,
                qualified: false,
                topResults: [],
                result: 0,
                rank: 0,
                parameters1: [],
                parameters2: false,
            };
            let message = svc.wm5.protobuf.LoadGhostCompetitionInfoResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // load_ghost_competition_ranking - loads OCM competition ranking
        app.post('/method/load_ghost_competition_ranking', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                periodId: 0,
                numOfParticipants: 0,
                topRecords: [],
            };
            let message = svc.wm5.protobuf.LoadGhostCompetitionRankingResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // load_car_campaign_info - loads car campaign info
        app.post('/method/load_car_campaign_info', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                carCampaignUserState: wm.wm5.protobuf.CarCampaignUserState.CAR_CAMPAIGN_NOT_ACCEPTED,
                numOfPieces: 0,
                numOfRemainingLotteries: 0,
                lotteryOpenBits: 0,
            };
            let message = svc.wm5.protobuf.LoadCarCampaignInfoResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // save_car_campaign_info - saves car campaign progress
        app.post('/method/save_car_campaign_info', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.SaveCarCampaignInfoResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // accept_car_campaign - accepts car campaign
        app.post('/method/accept_car_campaign', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.AcceptCarCampaignResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // save_face_recognition_result - saves face recognition result
        app.post('/method/save_face_recognition_result', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.SaveFaceRecognitionResultResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // save_friend_list - saves friend list
        app.post('/method/save_friend_list', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
            };
            let message = svc.wm5.protobuf.SaveFriendListResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // receive_maxi_gold - receives maxi gold rewards
        app.post('/method/receive_maxi_gold', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                maxiGoldBefore: 0,
                maxiGoldAfter: 0,
                income: [],
            };
            let message = svc.wm5.protobuf.ReceiveMaxiGoldResponse.encode(msg);
            common.sendResponse(message, res);
        });

        // start_transfer - starts card data transfer
        app.post('/method/start_transfer', (req, res) => {
            let msg = {
                error: wm.wm5.protobuf.ErrorCode.ERR_SUCCESS,
                userId: 0,
                pollingInterval: 0,
            };
            let message = svc.wm5.protobuf.StartTransferResponse.encode(msg);
            common.sendResponse(message, res);
        });
    }
}
