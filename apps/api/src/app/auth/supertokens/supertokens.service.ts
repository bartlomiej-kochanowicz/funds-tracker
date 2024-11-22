import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailVerification from "supertokens-node/recipe/emailverification";

import { ConfigInjectionToken, AuthModuleConfig } from "../config.interface";

@Injectable()
export class SupertokensService {
	constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
		supertokens.init({
			appInfo: config.appInfo,
			supertokens: {
				connectionURI: config.connectionURI,
				apiKey: config.apiKey,
			},
			recipeList: [
				EmailPassword.init(),
				ThirdParty.init({
					// We have provided you with development keys which you can use for testing.
					// IMPORTANT: Please replace them with your own OAuth keys for production use.
					signInAndUpFeature: {
						providers: [
							{
								config: {
									thirdPartyId: "google",
									clients: [
										{
											clientId:
												"1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
											clientSecret: "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",
										},
									],
								},
							},
							{
								config: {
									thirdPartyId: "apple",
									clients: [
										{
											clientId: "4398792-io.supertokens.example.service",
											additionalConfig: {
												keyId: "7M48Y4RYDL",
												privateKey:
													"-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
												teamId: "YWQCXGJRJL",
											},
										},
									],
								},
							},
						],
					},
				}),
				Session.init(),
				EmailVerification.init({
					mode: "REQUIRED",
				}),
				Dashboard.init(),
			],
		});
	}
}
