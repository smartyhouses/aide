/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {
	export enum DevtoolsStatus {
		ServerConnected = 'server-connected',
		DevtoolsConnected = 'devtools-connected',
		Error = 'error',
		Idle = 'idle'
	}

	export namespace devtools {
		export function setStatus(status: DevtoolsStatus): void;
		export function setIsInspectingHost(isInspecting: boolean): void;
		export function setLatestPayload(payload: Location | null): void;
		export const onDidTriggerInspectingHostStart: Event<void>;
		export const onDidTriggerInspectingHostStop: Event<void>;
	}
}
