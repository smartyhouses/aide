/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../base/common/lifecycle.js';
import { revive } from '../../../base/common/marshalling.js';
import { Location } from '../../../editor/common/languages.js';
import { IDevtoolsService, DevtoolsStatus } from '../../contrib/aideAgent/common/devtoolsService.js';

import { extHostNamedCustomer, IExtHostContext } from '../../services/extensions/common/extHostCustomers.js';
import { Dto } from '../../services/extensions/common/proxyIdentifier.js';
import { ExtHostContext, ExtHostDevtoolsShape, MainContext, MainThreadDevtoolsShape } from '../common/extHost.protocol.js';

@extHostNamedCustomer(MainContext.MainThreadDevtools)
export class MainThreadDevtools extends Disposable implements MainThreadDevtoolsShape {
	private readonly _proxy: ExtHostDevtoolsShape;

	constructor(
		extHostContext: IExtHostContext,
		@IDevtoolsService private readonly _devtoolsService: IDevtoolsService
	) {
		super();
		this._proxy = extHostContext.getProxy(ExtHostContext.ExtHostDevtools);

		this._register(this._devtoolsService.onDidTriggerInspectingHostStart(() => {
			this._proxy.$startInspectingHost();
		}));

		this._register(this._devtoolsService.onDidTriggerInspectingHostStop(() => {
			this._proxy.$stopInspectingHost();
		}));
	}

	$setLatestPayload(payload: Dto<Location> | null): void {
		const location = revive(payload) as Location;
		this._devtoolsService.latestPayload = location;
	}

	$setStatus(status: DevtoolsStatus) {
		this._devtoolsService.status = status;
	}

	$setIsInspecting(isInspecting: boolean) {
		this._devtoolsService.isInspecting = isInspecting;
	}
}
