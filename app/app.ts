/**
 * Copyright (c) 2023 John Toebes
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { BaseApp } from './baseapp';
import {
    BTDocumentElementInfo,
    BTDocumentSummaryInfo,
    BTGlobalTreeMagicNodeInfo,
    BTGlobalTreeNodeInfo,
    BTGlobalTreeNodesInfo,
    BTGlobalTreeNodesInfoFromJSON,
    BTInsertableInfo,
    BTInsertablesListResponse,
    BTInsertablesListResponseFromJSON,
    BTMIndividualQuery138,
    BTMParameter1,
    BTMParameterBoolean144,
    BTMParameterDerived864,
    BTMParameterEnum145,
    BTMParameterQuantity147,
    BTMParameterQueryList148,
    BTMParameterString149,
    BTThumbnailInfo,
    GBTElementType,
    GetInsertablesRequest,
    GetWMVEPsMetadataWvmEnum,
} from 'onshape-typescript-fetch';
import { createSVGIcon, OnshapeSVGIcon } from './onshape/svgicon';
import { JTTable } from './common/jttable';
import { classListAdd, createDocumentElement, waitForTooltip } from './common/htmldom';
import { genEnumOption } from './components/configurationoptions';
import { Preferences } from './preferences';
export interface magicIconInfo {
    label: string;
    icon: OnshapeSVGIcon;
    hideFromMenu?: boolean;
}

export interface configInfo {
    type: string;
    id: string;
    value: string;
}

export interface configInsertInfo {
    configList: configInfo[];
    deterministicId?: string;
    libraryVersion?: number;
    microversionSkew?: boolean;
    rejectMicroversionSkew?: boolean;
    serializationVersion?: string;
    sourceMicroversion?: string;
}

export interface metaData {
    [key: string]: any;
}

export interface folderLocation {
    folder: BTGlobalTreeNodeInfo;
    teamroot: BTGlobalTreeNodeInfo;
}

export class App extends BaseApp {
    public myserver = 'https://ftconshape.com/oauthexample';
    public magic = 1;
    public loaded = 0;
    public loadedlimit = 2500; // Maximum number of items we will load
    public targetDocumentElementInfo: BTDocumentElementInfo = {};

    public insertToTarget: (
        documentId: string,
        workspaceId: string,
        elementId: string,
        item: BTInsertableInfo,
        insertInfo: configInsertInfo
    ) => void = this.insertToOther;

    public magicInfo: { [item: string]: magicIconInfo } = {
        '0': { icon: 'svg-icon-recentlyOpened', label: 'Recently Opened' },
        '1': { icon: 'svg-icon-myDocuments', label: 'My Onshape' },
        '2': { icon: 'svg-icon-createdByMe', label: 'Created by Me' },
        '3': { icon: 'svg-icon-public', label: 'Public' },
        '4': { icon: 'svg-icon-trash', label: 'Trash' },
        '5': {
            icon: 'svg-icon-tutorial-element',
            label: 'Tutorials & Samples',
        },
        '6': {
            icon: 'svg-icon-tutorial-element',
            label: 'FeatureScript samples',
        },
        '7': {
            icon: 'svg-icon-tutorial-element',
            label: 'Community spotlight',
        },
        '8': { icon: 'svg-icon-help-ios', label: 'IOS Tutorials' },
        '9': { icon: 'svg-icon-help-android', label: 'Android Tutorials' },
        '10': { icon: 'svg-icon-label', label: 'Labels', hideFromMenu: true },
        '11': { icon: 'svg-icon-team', label: 'Teams' },
        '12': { icon: 'svg-icon-sharedWithMe', label: 'Shared with me' },
        '13': {
            icon: 'svg-icon-document-upload-cloud',
            label: 'Cloud Storage',
            hideFromMenu: true,
        },
        '14': {
            icon: 'svg-icon-tutorial-element',
            label: 'Custom table samples',
        },
        RI: { icon: 'svg-icon-recentlyOpened', label: 'Recently Inserted' },
    };
    public preferences: Preferences;
    /**
     * The main entry point for an app
     */
    public startApp(): void {
        this.preferences = new Preferences(this.onshape);
        this.preferences
            .initUserPreferences('insert_manager')
            .then((_val) => {
                // Create the main container
                var div = createDocumentElement('div', { id: 'apptop' });
                this.createPopupDialog(div);

                // Create the main div that shows where we are
                var bcdiv = createDocumentElement('div', {
                    id: 'breadcrumbs',
                    class: 'os-documents-heading-area disable-user-select os-row os-wrap os-align-baseline',
                });
                div.appendChild(bcdiv);

                // Create a place holder for the nodes to be dumped into
                const dumpNodes = createDocumentElement('div', {
                    id: 'dump',
                    class: 'y-overflow',
                });
                div.appendChild(dumpNodes);

                this.setAppElements(div);
                this.setBreadcrumbs([]);

                this.getDocumentElementInfo(
                    this.documentId,
                    this.workspaceId,
                    this.elementId
                )
                    .then((val: BTDocumentElementInfo) => {
                        this.targetDocumentElementInfo = val;

                        if (val.elementType === 'PARTSTUDIO') {
                            this.insertToTarget = this.insertToPartStudio;
                        } else if (val.elementType === 'ASSEMBLY') {
                            this.insertToTarget = this.insertToAssembly;
                        } else {
                            this.failApp(
                                `Only able to insert into PartStudios and Assemblies.  This page is of type ${val.elementType}`
                            );
                            return;
                        }

                        this.getLastLocation().then((lastLocation) => {
                            this.gotoFolder(lastLocation[0], lastLocation[1]);
                        });
                    })
                    .catch((err) => {
                        this.failApp(err);
                    });
            })
            .catch((err) => {
                this.failApp(err);
            });
    }
    /**
     * Handle when an app is unable to authenticate or has any other problem when starting
     * @param reason Reason for initialization failure
     */
    public failApp(reason: string): void {
        super.failApp(reason);
    }
    /**
     * Create the initial page showing that we are initializing
     */
    public showInitializing() {
        super.showInitializing();
    }
    /**
     * Preserve the last location that we were at
     * @param location Location to
     */
    public saveLastLocation(location: folderLocation): void {
        this.preferences.setLastKnownLocation([location.folder, location.teamroot]);
    }
    /**
     * Restore the last saved location
     * @returns Last saved location
     */
    public getLastLocation(): Promise<Array<BTGlobalTreeNodeInfo>> {
        return new Promise((resolve, _reject) => {
            this.preferences
                .getLastKnownLocation()
                .then((locations) => {
                    if (locations === null || locations === undefined) {
                        resolve([{ jsonType: 'home' }, undefined]);
                    } else {
                        resolve(locations);
                    }
                })
                .catch((err) => {
                    resolve([{ jsonType: 'home' }, undefined]);
                });
        });
    }
    /**
     * Set the breadcrumbs in the header
     * @param breadcrumbs Array of breadcrumbs (in reverse order)
     * @param teamroot Preserved team root so that we know when we are processing a folder under a team
     */
    public setBreadcrumbs(
        breadcrumbs: BTGlobalTreeNodeInfo[],
        teamroot?: BTGlobalTreeNodeInfo
    ): void {
        // Find where they want us to put the breadcrumbs
        const breadcrumbscontainer = document.getElementById('breadcrumbs');
        if (breadcrumbscontainer === undefined || breadcrumbscontainer === null) {
            // If we don't have a place for it, just skip out
            return;
        }
        // This is what Onshape Generates
        //
        // <span ng-if="!documentSearch.searchText" class="documents-filter-heading spaced-filter-name">
        //   <span ng-if="documentSearch.resourceType" class="documents-filter-heading">
        //     <os-breadcrumb breadcrumb-nodes="breadcrumbNodesList" expand-container-selectors="['.documents-filter-heading.spaced-filter-name', '.documents-filter-heading:not(.spaced-filter-name)']" lower-bound-selector="'.os-items-footer'" lower-bound-offset="12" allow-drop="true" on-drop-callback="onDropOverBreadCrumb(targetNodeId, targetNodeType)" on-dragover-callback-should-disable="shouldDisableDragoverForBreadCrumb(isMyOnshape, event)" class="">
        //       <div class="os-breadcrumb-container">
        //         <os-breadcrumb-node class="os-breadcrumb-root-node" ng-if="$ctrl.firstBreadcrumbNode()" breadcrumb-node="$ctrl.firstBreadcrumbNode()" hide-first-text="$ctrl.hideFirstNodeText" last="$ctrl.breadcrumbNodes.length === 1" first="true" dnd-list="" dnd-dragover="$ctrl.onDragOver({isFirstNode: true, isLastNode: $ctrl.breadcrumbNodes.length === 1, event})" dnd-drop="$ctrl.onDrop($ctrl.firstBreadcrumbNode().options)" os-drag-leave="">
        //           <div class="os-breadcrumb-node" ng-if="$ctrl.breadcrumbNode" ng-class="{'os-breadcrumb-leaf': $ctrl.last}">
        //             <svg class="breadcrumb-node-icon os-svg-icon node-icon" ng-if="$ctrl.breadcrumbNode.options.icon" icon="sharedWithMe" ng-class="{'node-icon': !$ctrl.last, 'breadcrumb-node-text-hidden': !$ctrl.shouldShowTitle() &amp;&amp; !$ctrl.last }" ng-click="$ctrl.breadcrumbNode.callback($ctrl.breadcrumbNode.options)" data-original-title="Shared with me" data-placement="bottom">
        //             <title></title>
        //               <use ng-if="!fromUri" href="#svg-icon-sharedWithMe" link="#svg-icon-sharedWithMe"></use>
        //             </svg>
        //             <div class="node-title" ng-class="{'hide-node-title': $ctrl.breadcrumbNode.uiSref || !$ctrl.shouldShowTitle()}" data-original-title="Shared with me" data-placement="bottom">
        //               <a ng-click="$ctrl.breadcrumbNode.callback($ctrl.breadcrumbNode.options)">Shared with me</a>
        //             </div>
        //             <div ng-hide="$ctrl.last" class="node-seperator">
        //               <svg class="os-svg-icon" icon="forward-tab">
        //                 <title></title>
        //                 <use ng-if="!fromUri" href="#svg-icon-forward-tab" link="#svg-icon-forward-tab"></use>
        //               </svg>
        //             </div>
        //           </div>
        //         </os-breadcrumb-node>
        //         <div class="os-breadcrumb-dropdown ng-hide" ng-class="{'os-breadcrumb-dropdown-drag-enter': $ctrl.isDropdownDragEnter }" ng-style="{ 'opacity': $ctrl.isInitialCalculation ? '0': '1'}" ng-show="$ctrl.isInitialCalculation || ($ctrl.collapsedBreadcrumbNodes &amp;&amp; $ctrl.collapsedBreadcrumbNodes.length)" style="opacity: 1;">
        //           <button type="button" class="os-breadcrumb-dropdown-toggle dropdown-toggle" data-toggle="dropdown">
        //             <svg class="os-svg-icon" icon="overflow">
        //               <title></title>
        //               <use ng-if="!fromUri" href="#svg-icon-overflow" link="#svg-icon-overflow"></use>
        //             </svg>
        //           </button>
        //           <div class="os-breadcrumb-dropdown-menu dropdown-menu append-to-body-menu-a-6" ng-class="{ 'opened-from-drag': $ctrl.dropdownWasOpenedFromDrag }" menu-width="none" os-append-to-body="{ backdrop: false, lowerBound: $ctrl.getLowerBound(), lowerBoundOffset: $ctrl.getLowerBoundOffset() }" style="z-index: 1100;">
        //             <div class="os-breadcrumb-dropdown-scroll-container">
        //               <ul class="os-scroll-container-content">
        //               </ul>
        //             </div>
        //           </div>
        //           <div class="node-seperator">
        //             <svg class="os-svg-icon" icon="forward-tab">
        //               <title></title>
        //               <use ng-if="!fromUri" href="#svg-icon-forward-tab" link="#svg-icon-forward-tab"></use>
        //             </svg>
        //           </div>
        //         </div>
        //         <os-breadcrumb-node ng-repeat="node in $ctrl.displayBreadcrumbNodes" breadcrumb-node="node" hide-first-text="false" dnd-list="" dnd-dragover="$ctrl.onDragOver({isFirstNode: false, isLastNode: $last, event})" dnd-drop="$ctrl.onDrop(node.options)" os-drag-leave="" ng-style="{'flex-shrink': $ctrl.allowShrink ? '1' : '0'}" first="false" last="$last" style="flex-shrink: 0;">
        //           <div class="os-breadcrumb-node os-breadcrumb-leaf" ng-if="$ctrl.breadcrumbNode" ng-class="{'os-breadcrumb-leaf': $ctrl.last}">
        //             <svg class="breadcrumb-node-icon os-svg-icon" ng-if="$ctrl.breadcrumbNode.options.icon" icon="folder" ng-class="{'node-icon': !$ctrl.last, 'breadcrumb-node-text-hidden': !$ctrl.shouldShowTitle() &amp;&amp; !$ctrl.last }" ng-click="$ctrl.breadcrumbNode.callback($ctrl.breadcrumbNode.options)" data-original-title="ServoCity" data-placement="bottom">
        //               <title></title>
        //               <use ng-if="!fromUri" href="#svg-icon-folder" link="#svg-icon-folder"></use>
        //             </svg>
        //             <div class="node-title hide-node-title" ng-class="{'hide-node-title': $ctrl.breadcrumbNode.uiSref || !$ctrl.shouldShowTitle()}" data-original-title="ServoCity" data-placement="bottom">
        //               <a ng-click="$ctrl.breadcrumbNode.callback($ctrl.breadcrumbNode.options)">ServoCity</a>
        //             </div>
        //             <div ng-if="$ctrl.last" class="node-title" data-original-title="ServoCity" data-placement="bottom">
        //               <span>ServoCity</span>
        //             </div>
        //             <div ng-hide="$ctrl.last" class="node-seperator ng-hide">
        //               <svg class="os-svg-icon" icon="forward-tab">
        //                 <title></title>
        //                 <use ng-if="!fromUri" href="#svg-icon-forward-tab" link="#svg-icon-forward-tab"></use>
        //               </svg>
        //             </div>
        //           </div>
        //         </os-breadcrumb-node>
        //       </div>
        //     </os-breadcrumb>
        //   </span>
        // </span>

        // This is what we will do
        //
        // <div class="os-breadcrumb-container">
        //     <div class="os-breadcrumb-node">   (onclick for the div)
        //        createSVGIcon('svg-icon-sharedWithMe','breadcrumb-node-icon os-svg-icon node-icon')
        //       <div class="node-title" data-original-title="Shared with me" data-placement="bottom">
        //         <a>Shared with me</a>
        //       </div>
        //       <div class="node-seperator">
        //         createSVGIcon('svg-icon-forward-tab','os-svg-icon')
        //       </div>
        //     </div>
        //
        //   If we need to have a ... to shorten it
        //   <div class="os-breadcrumb-dropdown" >
        //     <button type="button" class="os-breadcrumb-dropdown-toggle dropdown-toggle" data-toggle="dropdown">
        //        createSVGIcon('svg-icon-overflow','os-svg-icon')
        //     </button>
        //     <div class="node-seperator">
        //        createSVGIcon('svg-icon-forward-tab','os-svg-icon')
        //     </div>
        //   </div>
        //
        //   Typical folder at the end
        //   <div class="os-breadcrumb-node os-breadcrumb-leaf">  // Leaf goes on the end
        //      createSVGIcon('svg-icon-folder','breadcrumb-node-icon os-svg-icon')
        //     <div class="node-title" data-original-title="ServoCity" data-placement="bottom">
        //       ServoCity
        //     </div>
        //   </div>
        //
        // </div>

        // Always create a home button to go to the top level list
        const breadcrumbsdiv = createDocumentElement('div', {
            class: 'os-breadcrumb-container',
        });
        breadcrumbsdiv.appendChild(
            this.createBreadcrumbNode(
                'svg-icon-home-button',
                'Home',
                breadcrumbs.length === 0,
                () => {
                    this.gotoFolder({ jsonType: 'home' });
                }
            )
        );
        // Keep track of when we we need to override the next folder entry with the team icon
        let useteamicon = false;
        for (let i = breadcrumbs.length - 1; i >= 0; i--) {
            const node = breadcrumbs[i];

            let breadcrumbdiv: HTMLElement;
            const isLast = i == 0;
            // Assume we won't have to insert the fake team root into the breadcrumb list
            let addteamroot = false;
            if (node.resourceType === 'magic') {
                // This is one of the magic entries.
                let nodeid = node.id;
                let nodename = node.name;
                // When we are dealing with a team, the path to root doesn't tell you that
                // it is part of a team and instead says it is a shared folder.
                // So what we need to do in this case is to insert a magic
                if (nodeid === '12' && teamroot !== undefined) {
                    // 12 is "Shared with me"
                    nodeid = '11'; // 11 is Teams
                    nodename = this.magicInfo[nodeid].label;
                    addteamroot = true;
                    useteamicon = true;
                }
                let magicinfo = this.magicInfo[nodeid];
                if (magicinfo === undefined || magicinfo === null) {
                    // But we don't recognize which magic it is, so
                    breadcrumbdiv = this.createBreadcrumbNode(
                        'svg-icon-error',
                        `${node.id} - NOT FOUND (${node.name})`,
                        isLast && !addteamroot,
                        () => {
                            this.gotoFolder({ jsonType: 'home' });
                        }
                    );
                } else {
                    // We know which one it is, so use the proper icon
                    // And make it so that when they click they go to the right directory
                    breadcrumbdiv = this.createBreadcrumbNode(
                        magicinfo.icon,
                        nodename,
                        isLast && !addteamroot,
                        () => {
                            this.gotoFolder(node);
                        }
                    );
                }
            } else {
                // Just a normal folder.  make it so that clicking on it
                // navigates to the folder.  However we need to remember
                // that just because it is a folder, doesn't mean it wasn't shared with a team
                let icon: OnshapeSVGIcon = 'svg-icon-folder';
                if (useteamicon || node.resourceType === 'team') {
                    icon = 'svg-icon-team';
                    useteamicon = false;
                }
                breadcrumbdiv = this.createBreadcrumbNode(icon, node.name, isLast, () => {
                    this.gotoFolder(node, teamroot);
                });
            }
            breadcrumbsdiv.appendChild(breadcrumbdiv);
            // Did we need to put in the fake team root that was missed in the breadcrumb list?
            if (addteamroot) {
                let teamrootdiv = this.createBreadcrumbNode(
                    'svg-icon-team',
                    teamroot.name,
                    isLast,
                    () => {
                        this.gotoFolder(teamroot, teamroot);
                    }
                );
                breadcrumbsdiv.appendChild(teamrootdiv);
                useteamicon = false;
            }
        }
        breadcrumbscontainer.replaceChildren(breadcrumbsdiv);
    }
    /**
     * Create a single breadcrumb node (with separators as needed)
     * @param icon Icon for the node
     * @param title Title of the node
     * @param isLast This is the last in the list of nodes
     * @param onclickFunction Function to call when it is clicked on
     * @returns HTMLElement with all the UI elements in it
     */
    public createBreadcrumbNode(
        icon: OnshapeSVGIcon,
        title: string,
        isLast: boolean,
        onclickFunction: (e: any) => any
    ): HTMLElement {
        const div = createDocumentElement('div', {
            class: 'os-breadcrumb-node',
        });
        if (isLast) {
            div.classList.add('os-breadcrumb-leaf');
        }
        const nodeicon = createSVGIcon(icon);
        nodeicon.onclick = onclickFunction;
        div.appendChild(nodeicon);

        const titlediv = createDocumentElement('div', {
            class: 'node-title',
            title: title,
            'data-placement': 'bottom',
            textContent: title,
        });
        titlediv.onclick = onclickFunction;
        div.appendChild(titlediv);
        if (!isLast) {
            const seperatordiv = createDocumentElement('div', {
                class: 'node-seperator',
            });
            seperatordiv.appendChild(createSVGIcon('svg-icon-forward-tab'));
            div.appendChild(seperatordiv);
        }
        return div;
    }
    /**
     * Show all of the selectable items on the home menu
     * @param elem DOM Element to put information into
     */
    public processHome(elem: HTMLElement) {
        const table = new JTTable({
            class: 'os-document-filter-table full-width',
        });
        for (const magicid in this.magicInfo) {
            const magicinfo = this.magicInfo[magicid];
            if (!magicinfo.hideFromMenu) {
                const magicNode: BTGlobalTreeNodeInfo = {
                    jsonType: 'magic',
                    id: magicid,
                };
                const row = table.addBodyRow();
                const span = createDocumentElement('span');
                const icon = createSVGIcon(magicinfo.icon, 'documents-filter-icon');
                icon.onclick = () => {
                    this.gotoFolder(magicNode);
                };
                span.appendChild(icon);
                const textspan = createDocumentElement('span', {
                    textContent: magicinfo.label,
                });
                textspan.onclick = () => {
                    this.gotoFolder(magicNode);
                };
                span.appendChild(textspan);
                row.add(span);
            }
        }
        elem.appendChild(table.generate());
        this.setBreadcrumbs([]);
    }

    /**
     * Append a dump of elements to the current UI
     * @param items Items to append
     * @param teamroot Preserved team root so that we know when we are processing a folder under a team
     */
    public appendElements(
        items: BTGlobalTreeMagicNodeInfo[],
        teamroot: BTGlobalTreeNodeInfo
    ): void {
        // Figure out where we are to add the entries
        let container = this.getFileListContainer();
        // Iterate over all the items
        items.map((item) => {
            const itemInfo = item as BTDocumentSummaryInfo;
            // Have we hit the limit?  If so then just skip out
            if (this.loaded >= this.loadedlimit) {
                return;
            }
            // Count another entry output
            this.loaded++;
            ///
            // <table class="os-documents-list os-items-table full-width"><tbody>
            // <tr class="os-item-row os-document-in-list">
            // <td class="os-documents-thumbnail-column os-document-folder-thumbnail-column document-item"><svg class="os-svg-icon folder-list-icon"><use href="#svg-icon-folder"></use></svg></td>
            // <td class="os-document-name document-item">Visor - John Toebes</td></tr></tbody></table>
            ////

            let rowelem = createDocumentElement('div', {
                class: 'document-version-item-row select-item-dialog-item-row os-selectable-item',
            });
            let selectable = true;
            if (itemInfo.permissionSet !== undefined) {
                if (itemInfo.permissionSet.indexOf('LINK') === -1) {
                    selectable = false;
                    classListAdd(rowelem, 'select-item-disabled-item');
                }
            }

            let iconCol = createDocumentElement('div', {
                class: 'os-thumbnail-image',
            });
            let img = undefined;
            if (item.jsonType === 'team-summary') {
                img = createSVGIcon('svg-icon-team', 'folder-list-icon');
            } else if (item.isContainer) {
                // if item is container
                img = createSVGIcon('svg-icon-folder', 'folder-list-icon');
            } else if (item.jsonType === 'document-summary') {
                // It has an image, so request the thumbnail to be loaded for it
                img = this.onshape.createThumbnailImage(itemInfo);
                img.classList.add('os-thumbnail-image');
                img.setAttribute('draggable', 'false');
                img.setAttribute('alt', 'Thumbnail image for a document.');
                img.ondragstart = (_ev) => {
                    return false;
                };
            }
            if (img !== undefined) {
                iconCol.appendChild(img);
            }
            rowelem.appendChild(iconCol);

            // Document Name
            const docName = createDocumentElement('span', {
                class: 'select-item-dialog-document-name document-version-picker-document-item',
                textContent: item.name,
            });

            let textCol = createDocumentElement('div', {
                class: 'select-item-dialog-document-name-box os-col',
            });
            textCol.appendChild(docName);
            rowelem.appendChild(textCol);

            rowelem.onmouseover = () => {
                waitForTooltip(
                    rowelem,
                    () => {
                        let rect = rowelem.getBoundingClientRect();
                        this.showPopup(item, rect);
                    },
                    () => {
                        this.hidePopup();
                    }
                );
            };
            if (selectable) {
                if (item.isContainer) {
                    rowelem.onclick = () => {
                        this.gotoFolder(item, teamroot);
                    };
                } else if (item.jsonType === 'document-summary') {
                    rowelem.onclick = () => {
                        this.hidePopup();
                        this.checkInsertItem(itemInfo);
                    };
                }
            }
            container.appendChild(rowelem);
        });
    }
    /**
     * Finds the documents container to append entries to.  If one doesn't
     * already exist it will add it in the proper place.
     * @returns Table to append entries to
     */
    public getFileListContainer(): HTMLElement {
        let container = document.getElementById('glist');
        if (container === null) {
            container = createDocumentElement('div', {
                class: 'os-documents-list full-width document-version-picker-section document-version-picker-document-list select-item-dialog-subdialog-content',
                id: 'glist',
            });
            const appelement = this.getAppElement();
            appelement.append(container);
        }
        return container;
    }
    /**
     * Get the element that represents the main container for the application
     * @returns HTMLElement for top of application
     */
    public getAppElement(): HTMLElement {
        let appelement = document.getElementById('app');
        // If for some reason we lost the place it is supposed to go, just append to the body
        if (appelement === null) {
            appelement = document.body;
        }
        return appelement;
    }
    /**
     *
     * @param item
     */
    public showPopup(item: BTGlobalTreeMagicNodeInfo, rect: DOMRect): void {
        const popup = document.getElementById('docinfo');
        if (popup !== null) {
            const itemInfo = item as BTDocumentSummaryInfo;
            // TODO: Move popup above item if it doesn't fit below
            popup.style.left = String(rect.left) + 'px';
            popup.style.top = String(rect.bottom) + 'px';
            popup.style.width = String(rect.width) + 'px';
            popup.style.maxWidth = String(rect.width) + 'px';
            let modifiedby = '';
            if (
                item.modifiedBy !== null &&
                item.modifiedBy !== undefined &&
                item.modifiedBy.name !== null &&
                item.modifiedBy.name !== undefined
            ) {
                modifiedby = item.modifiedBy.name;
            }
            let modifieddate = '';
            if (item.modifiedAt !== null && item.modifiedAt !== undefined) {
                modifieddate = item.modifiedAt.toLocaleString();
            }
            let ownedBy = '';
            if (
                item.owner !== null &&
                item.owner !== undefined &&
                item.owner.name !== null &&
                item.owner.name !== undefined
            ) {
                ownedBy = item.owner.name;
            }
            let createddate = '';
            if (item.createdAt !== null && item.createdAt !== undefined) {
                createddate = item.createdAt.toLocaleString();
            }
            let permissions = '';

            if (itemInfo.permissionSet !== undefined) {
                permissions = '[' + itemInfo.permissionSet.join(', ') + ']';
            }

            this.setElemText('docinfo_name', item.name);
            this.setElemText('docinfo_desc', item.description ?? '');
            // TODO: Reenable the div in the app.css when this gets working
            this.setElemText('docinfo_loc', 'LOCATION TBD');
            this.setElemText('docinfo_owner', ownedBy);
            this.setElemText('docinfo_datecreate', createddate);
            this.setElemText('docinfo_lastmod', modifieddate);
            this.setElemText('docinfo_modifier', modifiedby);
            this.setElemText('docinfo_permissions', permissions);
            popup.style.display = 'block';
        }
    }
    /**
     * Fill in the text content of an element
     * @param id ID of element to update
     * @param content Text content for element
     */
    setElemText(id: string, content: string) {
        const elem = document.getElementById(id);
        if (elem !== null) {
            elem.textContent = content;
        }
    }
    public hidePopup(): void {
        const popup = document.getElementById('docinfo');
        if (popup !== null) {
            popup.style.display = 'none';
        }
    }
    /**
     * Create the popup infrastructure for the file information
     * @param parent Place to put popup DOM element
     */
    public createPopupDialog(parent: HTMLElement): void {
        const popoverMainDiv = createDocumentElement('div', {
            id: 'docinfo',
            class: 'popover popup bs-popover-bottom',
        });
        popoverMainDiv.innerHTML = `<div class="popover-body">
            <div id="docinfo_name" class="popname"></div>
            <div id="docinfo_desc" class="popdesc"></div>
            <div class="poplocdiv">
               <span class="popttl">Location: </span>
               <span id="docinfo_loc" class="poploc">LOCATION TBD</span>
            </div>
            <div class="popusergrp">
               <strong>Owner:</strong> <span id="docinfo_owner"></span> created on <span id="docinfo_datecreate"></span>
            </div>
            <div class="popusergrp">
               <strong>Modified:</strong> <span id="docinfo_lastmod"></span> by <span id="docinfo_modifier"></span>
            </div>
            <div class="poppermit">
               <strong>Permissions:</strong> <span id="docinfo_permissions" class="popperm">LOCATION TBD</span>
            </div>
         </div>`;

        parent.appendChild(popoverMainDiv);
    }
    /**
     * Get the elements in a document
     * @param documentId Document ID
     * @param workspaceId Workspace ID
     * @param elementId Specific element ID
     * @returns Array of BTDocumentElementInfo
     */
    public getDocumentElementInfo(
        documentId: string,
        workspaceId: string,
        elementId?: string
    ): Promise<BTDocumentElementInfo> {
        return new Promise((resolve, reject) => {
            this.onshape.documentApi
                .getElementsInDocument({
                    did: documentId,
                    wvm: 'w',
                    wvmid: workspaceId,
                    elementId: elementId,
                })
                .then((val: BTDocumentElementInfo[]) => {
                    for (let elem of val) {
                        if (elem.id === this.elementId) {
                            resolve(elem);
                            return;
                        }
                    }
                    // We didn't find it, so return an empty structure
                    const result: BTDocumentElementInfo = {};
                    resolve(result);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    }
    /**
     *
     * 1. Examine the document an determine if we can insert without prompting the user
     *    a. There is a parts studio tab with the same name as the main document with a single object on that tab
     *       (or one object named the same as the main document) and no configuration options for that object.
     *       If so, insert it
     *    b. If there is an assembly tab with the same name as the main document with no configuration options
     *       and we are inserting into an assembly, insert the entire assembly.
     *    c. If there is a single tab (only looking at Parts studios and Assemblies) parts studio
     *       with a single part with no configuration options, insert it
     *    d. If there is a single assembly (looking at parts studios/assemblies) with no configuration options
     *       and we are inserting into an assembly then insert the entire assembly
     *    e. If there are no (parts studios/assembly) tabs, give them a message about nothing to insert
     * 2. We know that we have to present them a choice of what to insert.
     *    Go through all the (part studios/assemblies) tabs
     *    [eliminate assemblies if we are inserting into a parts studio]
     *    to gather all that have at least one item in them
     *    a. Tabs that are assemblies count as a single item.
     *    b. For parts we only want actual parts/combined parts, not drawings, curves, surfaces
     *    c. For every part that is on a tab with a configuration, remember the configuration options
     *    d. For every assembly with a configuration, remember the configuration options
     *    e. Create an overlay dialog (leaving the underlying list of parts still loaded) that offers the options to choose to insert.
     *       If an item has configuration options, put them next to the part.
     *       The overlay dialog has a close button and doesn't auto close after inserting the part from the dialog.
     *  Ok that's the goal.  It that the insertables API does a good job of filtering for most of that in one call
     */
    /**
     * Find all potential items to insert.
     * @param item Document that we are trying to insert from
     * @param insertType The type of document that we are inserting into
     * @returns Array of InsertElementInfo entries so that the inserting code can make a descision
     */
    public async getInsertChoices(
        item: BTDocumentSummaryInfo,
        insertType: GBTElementType
    ): Promise<BTInsertableInfo[]> {
        return new Promise(async (resolve, _reject) => {
            let versionId: string = undefined;
            if (item.recentVersion !== null && item.recentVersion !== undefined) {
                versionId = item.recentVersion.id;
            }
            // If item.defaultWorkspace is empty or item.defaultWorkspace.id is null then we need to
            // call https://cad.onshape.com/glassworks/explorer/#/Document/getDocumentWorkspaces to get a workspace
            // for now we will assume it is always provided
            let wv = 'w';
            let wvid = '';
            if (versionId !== undefined) {
                wv = 'v';
                wvid = versionId;
            } else if (
                item.defaultWorkspace !== null &&
                item.defaultWorkspace !== undefined
            ) {
                wv = 'w';
                wvid = item.defaultWorkspace.id;
            }
            const parameters: GetInsertablesRequest = {
                did: item.id,
                wv: wv,
                wvid: wvid,
                includeParts: true,
                includeSurfaces: false,
                includeSketches: false,
                includeReferenceFeatures: false,
                includeAssemblies: true,
                includeFeatureStudios: false,
                includeBlobs: false,
                includePartStudios: true,
                includeFeatures: true,
                includeMeshes: false,
                includeWires: false,
                includeFlattenedBodies: false,
                includeApplications: false,
                includeCompositeParts: true,
                includeFSTables: false,
                includeFSComputedPartPropertyFunctions: false,
                includeVariables: false,
                includeVariableStudios: false,
            };

            let insertables = await this.onshape.documentApi.getInsertables(parameters);
            const result: BTInsertableInfo[] = [];
            let donotuseelement: BTInsertableInfo = undefined;
            const insertMap = new Map<string, BTInsertableInfo>();
            const dropParents = new Map<string, Boolean>();
            while (insertables !== undefined && insertables.items.length > 0) {
                for (let element of insertables.items) {
                    if (
                        element.elementType === 'PARTSTUDIO' ||
                        (element.elementType === 'ASSEMBLY' &&
                            insertType === element.elementType)
                    ) {
                        let elementName = (element.elementName ?? '').toUpperCase();

                        if (
                            elementName.indexOf('DO NOT USE') < 0 &&
                            elementName.indexOf('LEGACY PART') < 0
                        ) {
                            // We want to save it
                            insertMap[element.id] = element;
                        } else {
                            // Save for the special case of the DO NOT USE ICON which would be the only object in the document
                            donotuseelement = element;
                        }
                        if (
                            element.parentId !== undefined &&
                            element.parentId !== null &&
                            elementName.indexOf('DO NOT USE THESE PARTS') >= 0
                        ) {
                            dropParents[element.parentId] = true;
                        }
                    }
                }
                // If we are finished with the list return it
                if (insertables.next === undefined || insertables.next === null) {
                    insertables = undefined;
                } else {
                    insertables = (await this.onshape.OnshapeRequest(
                        insertables.next,
                        BTInsertablesListResponseFromJSON
                    )) as BTInsertablesListResponse;
                }
            }
            // We have built a map of all the options, now go through and prune any parents
            for (const id in insertMap) {
                const element = insertMap[id];
                if (
                    element !== undefined &&
                    element !== null &&
                    element.parentId !== undefined &&
                    element.parentId !== null
                ) {
                    insertMap[element.parentId] = undefined;
                }
            }
            for (const id in insertMap) {
                const element = insertMap[id];
                if (element !== undefined) {
                    if (!dropParents[element.parentId]) {
                        result.push(insertMap[id]);
                    }
                }
            }
            // Special case when we have a document with a do not use and it is the only thing, let them insert it
            if (result.length === 0 && donotuseelement !== undefined) {
                result.push(donotuseelement);
            }
            resolve(result);
        });
    }
    /**
     *
     * @param item Item to be checked for a version
     * @returns Updated document Summary with version identified
     */
    public resolveDocumentVersion(
        item: BTDocumentSummaryInfo
    ): Promise<BTDocumentSummaryInfo> {
        return new Promise((resolve, reject) => {
            // If we have a version in it, we can just resolve to use it
            if (
                item.recentVersion !== null &&
                item.recentVersion !== undefined &&
                item.recentVersion.id !== null &&
                item.recentVersion.id !== undefined
            ) {
                resolve(item);
            }
            this.onshape.documentApi
                .getDocumentVersions({ did: item.id })
                .then((versions) => {
                    if (versions.length > 0) {
                        const versionId = versions[versions.length - 1].id;
                        if (
                            item.recentVersion === undefined ||
                            item.recentVersion === null
                        ) {
                            item.recentVersion = { id: versionId };
                        } else {
                            item.recentVersion.id = versionId;
                        }
                    }
                    resolve(item);
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * Check if an item can be inserted or if we have to prompt the user for more choices.
     * @param item Item to check
     */
    public checkInsertItem(itemRaw: BTDocumentSummaryInfo): void {
        this.resolveDocumentVersion(itemRaw).then((item) => {
            this.getInsertChoices(item, this.targetDocumentElementInfo.elementType).then(
                (res) => {
                    if (res.length === 0) {
                        // Nothing was insertable at all, so we just need to let them know that
                        alert('Nothing is insertable from this document');
                    } else if (res.length === 1) {
                        if (
                            res[0].configurationParameters !== undefined &&
                            res[0].configurationParameters !== null
                        ) {
                            this.showItemChoices(item, res);
                        } else {
                            // Perform an actual insert of an item. Note that we already know if we are
                            // going into a part studio or an assembly.
                            this.insertToTarget(
                                this.documentId,
                                this.workspaceId,
                                this.elementId,
                                res[0],
                                undefined
                            );
                        }
                    } else {
                        this.showItemChoices(item, res);
                    }
                }
            );
        });
    }

    public getConfigValues(index: number): configInfo[] {
        const collection = document.getElementsByClassName(`cv${index}`);
        // const plist:BTMParameterReferenceWithConfiguration3028 = undefined;

        const result: configInfo[] = [];

        Array.from(collection).forEach((element) => {
            const elemtype = element.getAttribute('data-type');
            const elemid = element.getAttribute('data-id');
            const inputelem: HTMLInputElement =
                element instanceof HTMLInputElement
                    ? (element as HTMLInputElement)
                    : undefined;
            const selectelem: HTMLSelectElement =
                element instanceof HTMLSelectElement
                    ? (element as HTMLSelectElement)
                    : undefined;
            switch (elemtype) {
                case 'quantity': {
                    const expression = inputelem ? inputelem.value.replace('+', ' ') : ''; // TODO: Why did they do this???
                    result.push({
                        type: 'BTMParameterQuantity-147',
                        id: elemid,
                        value: expression,
                    });
                    break;
                }
                case 'string': {
                    result.push({
                        type: 'BTMParameterString-149',
                        id: elemid,
                        value: inputelem ? inputelem.value : '',
                    });
                    break;
                }
                case 'enum': {
                    result.push({
                        type: 'BTMParameterEnum-145',
                        id: elemid,
                        value: selectelem ? selectelem.value : '',
                    });
                    break;
                }
                case 'boolean': {
                    result.push({
                        type: 'BTMParameterBoolean-144',
                        id: elemid,
                        value: inputelem
                            ? inputelem.checked
                                ? 'true'
                                : 'false'
                            : 'false',
                    });
                    break;
                }
            }
        });
        return result;
    }
    /**
     * Show options for a configurable item to insert
     * @param item
     */
    public async showItemChoices(
        parent: BTDocumentSummaryInfo,
        items: BTInsertableInfo[]
    ): Promise<void> {
        // Clean up the UI so we can populate it with the list
        let uiDiv = document.getElementById('dump');
        if (uiDiv !== null) {
            uiDiv.innerHTML = '';
        } else {
            uiDiv = document.body;
        }
        this.hidePopup();
        // This is what we are creating in the DOM
        // itemTreeDiv                <div class="select-item-tree">
        //                                <!--Element level insertables-->
        // itemParentGroup                <div class="select-item-parent-group">
        // itemParentRow                      <div class="select-item-dialog-item-row parent-item-expander-row os-selectable-item">
        //                                        <!--Element level collapse/expand buttons-->
        // levelControlButtons                    <div class="ns-select-item-dialog-item-expand-collapse">
        // imgExpand                                 <img src="https://cad.onshape.com/images/expanded.svg">
        //                                        </div>
        // divParentItem                          <div class="select-item-dialog-item parent-item">
        //                                            <!--Element level image/icon/thumbnail container-->
        // divParentThumbnailContainer                <div class="select-item-dialog-thumbnail-container os-no-shrink">
        //                                            <!--Element level thumbnail-->
        // imgParentThumbnail                         <img src="data:image/png;base64,xxxxxx">
        //                                        </div>
        //                                        <!--Element level display name-->
        // divParentTitle                         <div class="select-item-dialog-item-name">
        //                                            Aluminum Channel (Configurable)
        //                                        </div>
        //                                    </div>
        //                                </div>
        //                                <!-- Configuration selector -->
        //                                <div class="select-item-configuration-selector">
        //  childContainerDiv        <div class="select-item-dialog-item-row child-item-container os-selectable-item" >
        //    dialogItemDiv              <div class="select-item-dialog-item child-item">
        //                                   <!--Child level image/icon/thumbnail container-->
        //      childThumbnailDiv            <div class="select-item-dialog-thumbnail-container os-no-shrink">
        //                                       <!--Child level thumbnail-->
        //        imgChildThumbnail              <img src="/api/thumbnails/22f83f1be3e53004c07b6a491ec84af2939961cc/s/70x40?t=18bdb24e5837e17e04fd00f7&amp;rejectEmpty=true">
        //                                   </div>
        //                                   <!--Child level display name-->
        //      childNameDiv                 <div class="select-item-dialog-item-name">
        //                                      3.00" Aluminum Channel 585442
        //                                   </div>
        //                               </div>
        //                           </div>

        const itemTreeDiv = createDocumentElement('div', {
            class: 'select-item-tree',
        });
        const itemParentGroup = createDocumentElement('div', {
            class: 'select-item-parent-group',
        });
        itemTreeDiv.append(itemParentGroup);

        const itemParentRow = createDocumentElement('div', {
            class: 'select-item-dialog-item-row parent-item-expander-row os-selectable-item',
        });
        itemParentGroup.append(itemParentRow);

        const levelControlButtons = createDocumentElement('div', {
            class: 'ns-select-item-dialog-item-expand-collapse',
        });
        const imgExpand = createDocumentElement('img', {
            src: 'https://cad.onshape.com/images/expanded.svg',
        });
        levelControlButtons.append(imgExpand);
        itemParentRow.append(levelControlButtons);

        // Get the parent information
        const divParentItem = createDocumentElement('div', {
            class: 'select-item-dialog-item parent-item',
        });
        const divParentThumbnailContainer = createDocumentElement('div', {
            class: 'select-item-dialog-thumbnail-container os-no-shrink',
        });
        divParentItem.append(divParentThumbnailContainer);

        const imgParentThumbnail = this.onshape.createThumbnailImage(parent);
        itemParentRow.append(divParentItem);

        divParentThumbnailContainer.append(imgParentThumbnail);

        const divParentTitle = createDocumentElement('div', {
            class: 'select-item-dialog-item-name',
            textContent: parent.name,
        });

        itemParentRow.append(divParentTitle);
        uiDiv.appendChild(itemTreeDiv);
        let insertInfo: configInsertInfo = undefined;

        // Start the process off with the first in the magic list
        items.map(async (item: BTInsertableInfo, index: number) => {
            let configurable = false;
            if (
                item.configurationParameters !== undefined &&
                item.configurationParameters !== null
            ) {
                configurable = true;

                insertInfo = await this.outputConfigurationOptions(
                    item,
                    index,
                    itemParentGroup
                );
            }
            // Now we need to output the actual item.
            const childContainerDiv = createDocumentElement('div', {
                class: 'select-item-dialog-item-row child-item-container os-selectable-item',
            });
            const dialogItemDiv = createDocumentElement('div', {
                class: 'select-item-dialog-item child-item',
            });
            const childThumbnailDiv = createDocumentElement('div', {
                class: 'select-item-dialog-thumbnail-container os-no-shrink',
            });
            const imgChildThumbnail = this.onshape.createThumbnailImage(parent, {
                id: `ci${index}`,
            });
            childThumbnailDiv.append(imgChildThumbnail);
            const childNameDiv = createDocumentElement('div', {
                class: 'select-item-dialog-item-name',
                id: `ct${index}`,
                textContent: item.elementName,
            });
            dialogItemDiv.append(childThumbnailDiv);
            dialogItemDiv.append(childNameDiv);
            childContainerDiv.append(dialogItemDiv);

            if (configurable) {
                childContainerDiv.onclick = () => {
                    insertInfo.configList = this.getConfigValues(index);
                    this.insertToTarget(
                        this.documentId,
                        this.workspaceId,
                        this.elementId,
                        item,
                        insertInfo
                    );
                };
            } else {
                childContainerDiv.onclick = () => {
                    this.insertToTarget(
                        this.documentId,
                        this.workspaceId,
                        this.elementId,
                        item,
                        undefined
                    );
                };
            }

            itemParentGroup.append(childContainerDiv);
        });
        //}
    }
    /**
     * In order to insert a configured part, we need the part id.  For this we will look at the metadata
     * to find a part which has the same name as the one we are looking for.
     * Note that if it isn't a part, we can get out of here without doing any real work.  Otherwise
     * we will have to go back to Onshape to get the
     * @param item to look for.
     * @returns BTInsertableInfo with deterministicId filled in
     */
    public async findDeterministicPartId(
        item: BTInsertableInfo
    ): Promise<BTInsertableInfo> {
        return new Promise((resolve, _reject) => {
            // Make sure we have to do some work (if it isn't a part or we already know the id, get out of here)
            if (
                item.elementType !== 'PARTSTUDIO' ||
                (item.deterministicId !== undefined && item.deterministicId !== null)
            ) {
                console.log('findDeterminsticPartId Early Out');
                resolve(item);
            }
            // We have to retrieve the metadata, so figure out what version / workspace we want to ask for
            let wvm: GetWMVEPsMetadataWvmEnum = 'v';
            let wvmid = item.versionId ?? undefined;
            if (wvmid === undefined) {
                wvm = 'w';
                wvmid = item.workspaceId;
            }
            this.onshape.metadataApi
                .getWMVEPsMetadata({
                    did: item.documentId,
                    wvm: wvm,
                    wvmid: wvmid,
                    eid: item.elementId,
                })
                .then((metadata) => {
                    // Check the easy case - if there is only one item, then we can assume that it is the partid we are looking for
                    if (metadata.items.length === 1) {
                        item.deterministicId = metadata.items[0].partId;
                    } else {
                        // We need to go through all the metadata items and find one which has the name which is the same
                        // as our current item
                        const namedItem = metadata.items.find((metaItem) => {
                            const nameItem = metaItem.properties.find((prop) => {
                                return prop.name === 'Name';
                            });
                            return (
                                nameItem !== undefined &&
                                nameItem.value === item.elementName
                            );
                        });
                        // Searching is done.  If we found it, fill it in, otherwise complain loudly.
                        if (namedItem !== undefined) {
                            item.deterministicId = namedItem.partId;
                        } else {
                            // We can log the error, but just go on and let the application run without
                            // a deterministicId.  Eventually the insert will fail and it will be caught by
                            // the UI instead of rejecting it.
                            console.log(
                                `****Unable to find deterministicId - multiple metadata items ${metadata.items.length}`
                            );
                        }
                    }
                    resolve(item);
                });
        });
    }
    /**
     * In order to insert a configured part, we need the part id.  For this we will look at the metadata
     * to find a part which has the same name as the one we are looking for.
     * Note that if it isn't a part, we can get out of here without doing any real work.  Otherwise
     * we will have to go back to Onshape to get the
     * @param item to look for.
     * @returns BTInsertableInfo with deterministicId filled in
     */
    public async getMetaData(
        item: BTInsertableInfo,
        configuration: string
    ): Promise<metaData> {
        return new Promise((resolve, _reject) => {
            // We have to retrieve the metadata, so figure out what version / workspace we want to ask for
            let wvm: GetWMVEPsMetadataWvmEnum = 'v';
            let wvmid = item.versionId ?? undefined;
            if (wvmid === undefined) {
                wvm = 'w';
                wvmid = item.workspaceId;
            }
            this.onshape.metadataApi
                .getWMVEPsMetadata({
                    did: item.documentId,
                    wvm: wvm,
                    wvmid: wvmid,
                    eid: item.elementId,
                    thumbnail: true,
                    _configuration: configuration,
                })
                .then((metadata) => {
                    let result: metaData = {};
                    if (metadata.items.length > 0) {
                        if (metadata.items.length > 1) {
                            // Something is wrong, we got more than one item (which shouldn't happen).  Just let them know and ignore the extra items
                            console.log(
                                '***getWMVEPsMetadata returned more than one item'
                            );
                            console.log(item);
                            console.log(metadata);
                        }
                        const metaItem = metadata.items[0];
                        result['href'] = metaItem.href;
                        result['isFlattenedBody'] = metaItem.isFlattenedBody;
                        //result['isMesh'] = metaItem.isMesh  // TODO: This needs to be in the API
                        result['jsonType'] = metaItem.jsonType;
                        result['meshState'] = metaItem.meshState;
                        result['partId'] = metaItem.partId;
                        result['partType'] = metaItem.partType;
                        result['thumbnail'] = metaItem.thumbnail;

                        // Check the easy case - if there is only one item, then we can assume that it is the partid we are looking for
                        metaItem.properties.forEach((metaIitem) => {
                            result[metaIitem.name] = metaIitem.value;
                            if (metaIitem.valueType === 'ENUM') {
                                let enumEntry = metaIitem.enumValues.find((enumVal) => {
                                    return enumVal.value === metaIitem.value;
                                });
                                if (enumEntry !== undefined) {
                                    result[metaIitem.name] = enumEntry.label;
                                }
                            }
                        });
                        item.deterministicId = metaItem.partId;
                        resolve(result);
                    }
                });
        });
    }

    /**
     * Display the configuration options for an element
     * @param item Configurable element to output
     * @param itemParentGroup Location to put the configuration option
     */
    public outputConfigurationOptions(
        item: BTInsertableInfo,
        index: number,
        itemParentGroup: HTMLElement
    ): Promise<configInsertInfo> {
        return new Promise((resolve, _reject) => {
            // We have two pieces of information that we can actually ask for in parallel
            // First we need to know the deterministic part id if this is a partstudio item
            const findPartPromise = this.findDeterministicPartId(item);
            let wvm = 'v';
            let wvmid = item.versionId ?? undefined;
            if (wvmid === undefined) {
                wvm = 'w';
                wvmid = item.workspaceId;
            }
            // Second we need to get all the configuration information for the item
            const itemConfigPromise = this.onshape.elementApi.getConfiguration({
                did: item.documentId,
                wvm: wvm,
                wvmid: wvmid,
                eid: item.elementId,
            });
            // Run them both in parallel and when they are complete we can do our work
            Promise.all([findPartPromise, itemConfigPromise]).then(
                ([item, itemConfig]) => {
                    const result: configInsertInfo = {
                        configList: [],
                        deterministicId: item.deterministicId,
                        libraryVersion: itemConfig.libraryVersion,
                        microversionSkew: itemConfig.microversionSkew,
                        rejectMicroversionSkew: itemConfig.rejectMicroversionSkew,
                        serializationVersion: itemConfig.serializationVersion,
                        sourceMicroversion: itemConfig.sourceMicroversion,
                    };
                    let onchange = () => {};
                    let ongenerate = () => {};
                    if (itemConfig.configurationParameters.length === 1) {
                        onchange = () => {
                            this.updateConfigurationUI(item, index);
                        };
                    } else {
                        onchange = () => {
                            console.log('Multi-item Configuration Change');
                            const btn = document.getElementById(`cb${index}`);
                            if (btn !== undefined && btn !== null) {
                                btn.removeAttribute('disabled');
                            }
                        };
                        ongenerate = () => {
                            this.updateConfigurationUI(item, index);
                            const btn = document.getElementById(`cb${index}`);
                            if (btn !== undefined && btn !== null) {
                                btn.setAttribute('disabled', 'disabled');
                            }
                        };
                    }
                    itemParentGroup.append(
                        genEnumOption(itemConfig, index, onchange, ongenerate)
                    );
                    resolve(result);
                }
            );
        });
    }
    /**
     * Update the configuration image
     * @param item Item to be updated
     * @param index Configuration UI Index
     */
    public updateConfigurationUI(item: BTInsertableInfo, index: number) {
        const configList = this.getConfigValues(index);
        const configuration = this.buildAssemblyConfiguration(configList, '');

        const img = document.getElementById(`ci${index}`) as HTMLImageElement;

        if (img !== undefined && img !== null) {
            img.setAttribute(
                'src',
                'https://cad.onshape.com/images/default-document.png'
            );
        }
        this.getMetaData(item, configuration).then((res) => {
            const txtdiv = document.getElementById(`ct${index}`);
            if (txtdiv !== undefined && txtdiv !== null) {
                txtdiv.textContent = res['Name'];
            }
            const img = document.getElementById(`ci${index}`) as HTMLImageElement;

            if (img !== undefined && img !== null) {
                this.onshape.replaceThumbnailImage(
                    img,
                    res['thumbnail'] as BTThumbnailInfo,
                    { retry: true, retryInterval: 5 }
                );
            }
        });
    }

    /**
     * Insert to an unknown tab (generally this is an error)
     * @param documentId Document to insert into
     * @param workspaceId Workspace in the document
     * @param elementId Element of parts studio to insert into
     * @param item Document element to insert
     */
    public insertToOther(
        documentId: string,
        workspaceId: string,
        elementId: string,
        item: BTInsertableInfo,
        insertInfo: configInsertInfo
    ): void {
        alert(
            `Unable to determine how to insert item ${item.id} - ${item.elementName} into ${this.targetDocumentElementInfo.elementType} ${documentId}/w/${workspaceId}/e/${elementId}`
        );
    }
    /**
     * Create the configuration structure for inserting into a part
     * @param configList List of chosen configurations
     * @param namespace Namespace to insert from
     * @returns Array of BTMParameter1 structures for the insert part operation
     */
    public buildPartConfiguration(
        configList: configInfo[],
        namespace: string
    ): Array<BTMParameter1> {
        const result: Array<BTMParameter1> = [];

        configList.forEach((item) => {
            switch (item.type) {
                case 'BTMParameterQuantity-147': {
                    const configItem: BTMParameterQuantity147 = {
                        btType: item.type,
                        isInteger: false,
                        value: 0,
                        units: '',
                        expression: item.value,
                    };
                    result.push(configItem);
                    break;
                }
                case 'BTMParameterString-149': {
                    const configItem: BTMParameterString149 = {
                        btType: item.type,
                        value: item.value,
                    };
                    result.push(configItem);
                    break;
                }
                case 'BTMParameterEnum-145': {
                    const configItem: BTMParameterEnum145 = {
                        btType: item.type,
                        namespace: namespace,
                        value: item.value,
                        parameterId: item.id,
                        enumName: `${item.id}_conf`,
                    };
                    result.push(configItem);
                    break;
                }
                case 'BTMParameterBoolean-144': {
                    const configItem: BTMParameterBoolean144 = {
                        btType: item.type,
                        value: item.value === 'true',
                    };
                    result.push(configItem);
                    break;
                }
            }
        });
        return result;
    }
    /**
     * Create the configuration structure for inserting into an assembly
     * @param configList List of chosen configurations
     * @param _namespace Namespace to insert from
     * @returns Array of BTMParameter1 structures for the insert part operation
     */
    public buildAssemblyConfiguration(
        configList: configInfo[],
        _namespace: string
    ): string {
        let result = '';
        let extra = '';

        configList.forEach((item) => {
            result += `${extra}${item.id}=${item.value}`;
            extra = ';';
        });
        return result;
    }

    /**
     * Insert an item into a Parts Studio
     * @param documentId Document to insert into
     * @param workspaceId Workspace in the document
     * @param elementId Element of parts studio to insert into
     * @param item Document element to insert
     */
    public async insertToPartStudio(
        documentId: string,
        workspaceId: string,
        elementId: string,
        item: BTInsertableInfo,
        //        configList: configInfo[]
        insertInfo: configInsertInfo
    ): Promise<void> {
        // console.log(
        //     `Inserting item ${item.id} - ${item.elementName} into Part Studio ${documentId}/w/${workspaceId}/e/${elementId}`
        // );
        this.setInProgress();
        // "feature": {
        //     "btType": "BTMFeature-134",
        //     "namespace": "",
        //     "name": `Derived ${insertable.name}`,
        //     "suppressed": false,
        //     "featureType": "importDerived",
        //     "subFeatures": [],
        //     "returnAfterSubfeatures": false,
        //     "parameters": [
        //       {
        //         "btType": "BTMParameterQueryList-148",
        //         "parameterId": "parts",
        //         "queries": [
        //           {
        //             "btType": "BTMIndividualQuery-138",
        //             "queryStatement": null,
        //             "queryString": insertable.type === "PART" ? `query=qTransient("${insertable.partId}");` : "query=qEverything(EntityType.BODY);"
        //           }
        //         ]
        //       },
        //       {
        //         "btType": "BTMParameterDerived-864",
        //         "parameterId": "buildFunction",
        //         "namespace": namespace,
        //         "imports": []
        //         "configuration": configList,
        //       }
        //     ],
        //   },
        //   "libraryVersion": 1746,
        //   "microversionSkew": false,
        //   "rejectMicroversionSkew": false,
        //   "serializationVersion": "1.1.23"

        const namespace = this.computeNamespace(item);

        let queryString = 'query=qEverything(EntityType.BODY);';
        if (item.elementType === 'PARTSTUDIO') {
            if (item.deterministicId !== undefined && item.deterministicId !== null) {
                queryString = `query=qTransient("${item.deterministicId}");`;
            } else if (
                item.insertableQuery !== undefined &&
                item.insertableQuery !== null
            ) {
                queryString = item.insertableQuery;
            }
        }
        // If we are doing a plain part, we may have to actually ask the configuration in order to get the version of the library that we are inserting from
        if (insertInfo == undefined) {
            // Pick some clean defaults to work from
            insertInfo = {
                configList: [],
                libraryVersion: 1746,
                microversionSkew: false,
                rejectMicroversionSkew: false,
                serializationVersion: '1.1.23',
                sourceMicroversion: undefined,
            };
            let wvm = 'w';
            let wvmid = item.workspaceId;
            if (item.versionId !== undefined && item.versionId !== null) {
                wvm = 'v';
                wvmid = item.versionId;
            }
            // Second we need to get all the configuration information for the item
            const config = await this.onshape.elementApi.getConfiguration({
                did: item.documentId,
                wvm: wvm,
                wvmid: wvmid,
                eid: item.elementId,
            });

            insertInfo.libraryVersion = config.libraryVersion;
            insertInfo.microversionSkew = config.microversionSkew;
            insertInfo.rejectMicroversionSkew = config.rejectMicroversionSkew;
            insertInfo.serializationVersion = config.serializationVersion;
            insertInfo.sourceMicroversion = config.sourceMicroversion;
        }

        const iquery: BTMIndividualQuery138 = {
            btType: 'BTMIndividualQuery-138',
            queryStatement: null,
            // item.insertableQuery,
            queryString: queryString,
        };
        const queryList: BTMParameterQueryList148 = {
            btType: 'BTMParameterQueryList-148',
            queries: [iquery],
            parameterId: 'parts',
        };
        const btparameterDerived: BTMParameterDerived864 = {
            btType: 'BTMParameterDerived-864',
            parameterId: 'buildFunction',
            namespace: namespace,
            imports: [],
            _configuration: insertInfo.configList
                ? this.buildPartConfiguration(insertInfo.configList, namespace)
                : undefined,
        };
        this.onshape.partStudioApi
            .addPartStudioFeature({
                did: documentId,
                wvm: 'w',
                wvmid: workspaceId,
                eid: elementId,
                bTFeatureDefinitionCall1406: {
                    feature: {
                        btType: 'BTMFeature-134',
                        // featureId: "", // wasn't supplied
                        namespace: '', // Where does this come from?
                        name: `Derived ${item.elementName}`,
                        suppressed: false,
                        parameters: [queryList, btparameterDerived],
                        featureType: 'importDerived', // Where does this come from?
                        subFeatures: [],
                        // importMicroversion: "", // importMicroversion wasn't supplied
                        // nodeId: "", // NodeId wasn't supplied
                        returnAfterSubfeatures: false, // Why is this
                        // suppressionConfigured: false, // When would it be true
                        // variableStudioReference: false, // When would it be true
                    },
                    libraryVersion: insertInfo.libraryVersion,
                    microversionSkew: insertInfo.microversionSkew,
                    rejectMicroversionSkew: insertInfo.rejectMicroversionSkew,
                    serializationVersion: insertInfo.serializationVersion,
                    // sourceMicroversion: insertInfo.sourceMicroversion,  // Don't set this or it fails
                    // documentId: item.documentId,
                    // elementId: item.elementId,
                    // featureId: '', // item.featureId,
                    // isAssembly: item.elementType == 'ASSEMBLY',
                    // isWholePartStudio: false, // TODO: Figure this out
                    // microversionId: '', // item.microversionId,  // If you do this, it gives an error 400: Microversions may not be used with linked document references
                    // partId: item.deterministicId ?? '',
                    // versionId: item.versionId,
                },
            })
            .then(() => {
                this.setInProgress(false);
            })
            .catch((reason) => {
                this.setInProgress(false);

                // TODO: Figure out why we don't get any output when it actually succeeds
                if (reason !== 'Unexpected end of JSON input') {
                    console.log(`failed to create reason=${reason}`);
                }
            });
    }
    public computeNamespace(item: BTInsertableInfo) {
        let wvid = `w${item.workspaceId}`;
        if (item.versionId !== undefined && item.versionId !== null) {
            wvid = `v${item.versionId}`;
        }
        let mvid = `m${item.microversionId ?? '0'}`;

        return `d${item.documentId}::${wvid}::e${item.elementId}::${mvid}`;
    }

    /**
     * Insert an item into an Assembly
     * @param documentId Document to insert into
     * @param workspaceId Workspace in the document
     * @param elementId Element of parts studio to insert into
     * @param item Document element to insert
     */
    public insertToAssembly(
        documentId: string,
        workspaceId: string,
        elementId: string,
        item: BTInsertableInfo,
        insertInfo: configInsertInfo // configList: configInfo[]
    ): void {
        // console.log(
        //     `Inserting item ${item.id} - ${item.elementName} into Assembly ${documentId}/w/${workspaceId}/e/${elementId}`
        // );

        this.setInProgress();

        let configuration = undefined;
        if (insertInfo !== undefined && insertInfo.configList !== undefined) {
            configuration = this.buildAssemblyConfiguration(insertInfo.configList, '');
        }

        this.onshape.assemblyApi
            .createInstance({
                did: documentId,
                wid: workspaceId,
                eid: elementId,
                bTAssemblyInstanceDefinitionParams: {
                    _configuration: configuration,
                    documentId: item.documentId,
                    elementId: item.elementId,
                    featureId: '', // item.featureId,
                    isAssembly: item.elementType == 'ASSEMBLY',
                    isWholePartStudio: false, // TODO: Figure this out
                    microversionId: '', // item.microversionId,  // If you do this, it gives an error 400: Microversions may not be used with linked document references
                    partId: item.deterministicId ?? '',
                    versionId: item.versionId,
                },
            })
            .then(() => {
                this.setInProgress(false);
            })
            .catch((reason) => {
                this.setInProgress(false);

                // TODO: Figure out why we don't get any output when it actually succeeds
                if (reason !== 'Unexpected end of JSON input') {
                    console.log(`failed to create reason=${reason}`);
                }
            });
    }
    /**
     * Change the cursor while an operation is in progress
     * @param cursor Cursor to change to 'progress' and 'default' are good ones
     */
    public setInProgress(inprogress: boolean = true) {
        const element = document.getElementById('top');
        if (inprogress) {
            element.classList.add('waiting');
        } else {
            element.classList.remove('waiting');
        }
    }
    /**
     * Process a single node entry
     * @param uri URI node for the entries to be loaded
     */
    public processMagicNode(magic: string) {
        if (magic === 'RI') {
            this.preferences.getAllRecentlyInserted().then((res) => {
                const recentNode: BTGlobalTreeNodesInfo = {
                    pathToRoot: [
                        { jsonType: 'magic', id: magic, name: 'Recently Inserted' },
                    ],
                    next: undefined,
                    href: undefined,
                    items: res,
                };
                this.setBreadcrumbs(recentNode.pathToRoot);
                this.ProcessNodeResults(recentNode);
            });
            return;
        }
        // uri: string) {
        // Get Onshape to return the list
        this.onshape.globalTreeNodesApi
            .globalTreeNodesMagic({
                mid: magic,
                getPathToRoot: true,
                includeApplications: false,
                includeAssemblies: true,
                includeBlobs: false,
                includeFSComputedPartPropertyFunctions: false,
                includeFSTables: false,
                includeFeatureStudios: false,
                includeFeatures: false,
                includeFlattenedBodies: true,
                includePartStudios: false,
                includeParts: true,
                includeReferenceFeatures: false,
                includeSketches: true,
                includeSurfaces: true,
                includeVariableStudios: false,
                includeVariables: false,
                includeWires: false,
            })
            .then((res) => {
                this.setBreadcrumbs(res.pathToRoot);
                this.ProcessNodeResults(res);
            })
            .catch((err) => {
                // Something went wrong, some mark us as no longer running.
                console.log(`**** Call failed: ${err}`);
            });
    }
    /**
     * Dump out all the elements that were returned from Onshape
     * @param info Node entry to be processed
     * @param teamroot TreeNode information for a team root if this folder came from a team
     */
    public ProcessNodeResults(
        info: BTGlobalTreeNodesInfo,
        teamroot?: BTGlobalTreeNodeInfo
    ) {
        const nodes = info as BTGlobalTreeNodesInfo;
        // When it does, append all the elements to the UI
        this.appendElements(nodes.items, teamroot);
        // Do we have any more in the list and are we under the limit for the UI
        if (
            info.next !== '' &&
            info.next !== undefined &&
            this.loaded < this.loadedlimit
        ) {
            // We have more entries, so lets put a little "Loading More..." element at the
            // end of the list.  When it becomes visible because they scrolled down or because there
            // is more room on the screen, we will delete that Loading More element and then process
            // the next set of entries
            const container = this.getFileListContainer();
            let rowelem = createDocumentElement('div', {
                class: 'document-version-item-row select-item-dialog-item-row os-selectable-item',
            });

            let textCol = createDocumentElement('div', {
                class: 'select-item-dialog-document-name-box os-col',
                content: 'Loading More...',
            });
            rowelem.appendChild(textCol);
            container.appendChild(rowelem);
            // When the Loading More... becomes visible on the screen, we can load the next element
            const observer = new IntersectionObserver(
                (entry) => {
                    if (entry[0].isIntersecting) {
                        observer.disconnect();
                        rowelem.remove();
                        // Request the UI to jump to the next entry in the list.
                        this.onshape
                            .OnshapeRequest(info.next, BTGlobalTreeNodesInfoFromJSON)
                            .then((res: BTGlobalTreeNodesInfo) => {
                                this.ProcessNodeResults(res, teamroot);
                            });
                    }
                },
                { threshold: [0] }
            );
            observer.observe(rowelem);
        }
    }
    /**
     * Navigate into a folder and populate the UI with the contents
     * @param item Entry to be processed
     * @param teamroot Preserved team root so that we know when we are processing a folder under a team
     */
    public gotoFolder(item: BTGlobalTreeNodeInfo, teamroot?: BTGlobalTreeNodeInfo): void {
        this.hidePopup();

        this.saveLastLocation({ folder: item, teamroot: teamroot });

        // Note that we are running and reset the count of entries we have gotten
        this.loaded = 0;

        // Clean up the UI so we can populate it with new entries
        let dumpNodes = document.getElementById('dump');
        if (dumpNodes !== null) {
            dumpNodes.innerHTML = '';
        } else {
            dumpNodes = document.body;
        }
        const container = this.getFileListContainer();
        dumpNodes.appendChild(container);
        if (item.jsonType === 'team-summary') {
            this.onshape.globalTreeNodesApi
                .globalTreeNodesTeamInsertables({
                    teamId: item.id,
                    getPathToRoot: true,
                    includeAssemblies: true,
                    includeFlattenedBodies: true,
                    includeParts: true,
                    includeSketches: false,
                    includeSurfaces: false,
                })
                .then((res) => {
                    this.setBreadcrumbs(res.pathToRoot, item);
                    this.ProcessNodeResults(res, item);
                })
                .catch((err) => {
                    // Something went wrong, some mark us as no longer running.
                    console.log(`**** Call failed: ${err}`);
                });
        } else if (item.jsonType === 'proxy-library') {
            // this.preferences.getProxyLibrary(item).then((res) => {
            //     this.setBreadcrumbs(res.pathToRoot, teamroot);
            //     this.ProcessNodeResults(res, teamroot);
            // });
        } else if (item.jsonType === 'proxy-folder') {
            // this.preferences.getProxyFolder(item).then((res) => {
            //     this.setBreadcrumbs(res.pathToRoot, teamroot);
            //     this.ProcessNodeResults(res, teamroot);
            // });
        } else if (item.jsonType === 'home') {
            this.processHome(dumpNodes);
        } else if (item.jsonType === 'magic' || item.resourceType === 'magic') {
            this.processMagicNode(item.id);
        } else {
            this.onshape.globalTreeNodesApi
                .globalTreeNodesFolderInsertables({
                    fid: item.id,
                    getPathToRoot: true,
                    includeAssemblies: true,
                    includeFlattenedBodies: true,
                    includeParts: true,
                    includeSketches: false,
                    includeSurfaces: false,
                })
                .then((res) => {
                    this.setBreadcrumbs(res.pathToRoot, teamroot);
                    this.ProcessNodeResults(res, teamroot);
                })
                .catch((err) => {
                    // Something went wrong, some mark us as no longer running.
                    console.log(`**** Call failed: ${err}`);
                });
        }
    }
}
