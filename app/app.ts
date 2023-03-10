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
import { JTmakeSelectList, JTSelectItem } from './common/jtselect';
import { documentSummary } from './onshape';

export class App extends BaseApp {
    public myserver = 'https://ftconshape.com/oauthexample';
    public running = false;
    public magic = 1;
    public loaded = 0;
    public loadedlimit = 1000; // Maximum number of items we will load

    public magicOptions: JTSelectItem[] = [
        { value: '0', label: '0 - Recently Opened' },
        { value: '1', selected: true, label: '1 - My Onshape' },
        { value: '2', label: '2 - Created by Me' },
        { value: '3', label: '3 - Public' },
        { value: '4', label: '4 - Trash' },
        { value: '5', label: '5 - Tutorials & Samples' },
        { value: '6', label: '6 - FeatureScript samples' },
        { value: '7', label: '7 - Community spotlight' },
        { value: '8', label: '8 - IOS Tutorials' },
        { value: '9', label: '9 - Android Tutorials' },
        //        { value: '10', label: '10 - Labels' },
        { value: '11', label: '11 - Teams' },
        { value: '12', label: '12 - Shared with me' },
        { value: '13', label: '13 - Cloud Storage' },
        { value: '14', label: '14 - Custom table samples' },
    ];

    public getMagicTitle(magic: string): string {
        for (let item of this.magicOptions) {
            if (item.value === magic) {
                return item.label;
            }
        }
        return magic + ' - NOT FOUND';
    }

    /**
     * The main entry point for an app
     */
    public startApp(): void {
        // Create a dropdown that allows them to select which list to display
        var div = document.createElement('div');
        div.appendChild(
            JTmakeSelectList(
                'magic',
                'Select a List',
                'magiclist',
                this.magicOptions,
                (e) => {
                    console.log(e);
                    console.log(`changed to ${e.target.value}`);
                    this.dumpMagic(e.target.value);
                }
            )
        );

        // Create a place holder for the nodes to be dumped into
        const dumpNodes = document.createElement('div');
        dumpNodes.setAttribute('id', 'dump');
        div.appendChild(dumpNodes);

        this.setAppElements(div);

        // Start out by dumping the list of my Onshape entries
        this.dumpMagic('1');
    }

    /**
     * Mark the UI as running.  We disable the dropdown so that you can't request
     * switching while in the middle of runnign
     * @param running
     */
    public setRunning(running: boolean) {
        const magicSelect = document.getElementById(
            'magic'
        ) as HTMLSelectElement;
        if (magicSelect !== null) {
            magicSelect.disabled = running;
        }
        this.running = running;
    }
    /**
     * Dump a list of entries from the Magic api
     * @param magic Which magic list to dump
     * @returns
     */

    public dumpMagic(magic: string) {
        const magictitle = this.getMagicTitle(magic);
        // If we are in the process of running, we don't want to start things over again
        // so just ignore the call here
        if (this.running) {
            return;
        }
        // Note that we are running and reset the count of entries we have gotten
        this.setRunning(true);
        this.loaded = 0;

        // Clean up the UI so we can populate it with new entries
        let dumpNodes = document.getElementById('dump');
        if (dumpNodes !== null) {
            dumpNodes.innerHTML = '';
        } else {
            dumpNodes = document.body;
        }
        // Output the title of what we are dumping
        var h2 = document.createElement('h2');
        h2.innerHTML = 'Dumping ' + magictitle;
        dumpNodes.appendChild(h2);
        // And create a place holder for all the entries
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'glist');
        dumpNodes.appendChild(ul);
        // Start the process off with the first in the magic list
        this.processNode(
            `/api/globaltreenodes/magic/${magic}?getPathToRoot=true&limit=50&sortColumn=modifiedAt&sortOrder=desc`
        );
    }
    /**
     * Append a dump of elements to the current UI
     * @param items Items to append
     * @returns
     */
    public appendElements(items: documentSummary[]): void {
        // Figure out where we are to add the entries
        let ul = document.getElementById('glist');
        if (ul === null) {
            ul = document.createElement('ul');
            let appelement = document.getElementById('app');
            // If for some reason we lost the place it is supposed to go, just append to the body
            if (appelement === null) {
                appelement = document.body;
            }
            appelement.append(ul);
        }
        //
        // Iterate over all the items
        for (let item of items) {
            // Have we hit the limit?  If so then just skip out
            if (this.loaded >= this.loadedlimit) {
                return;
            }
            // Count another entry output
            this.loaded++;
            // Create a LI element to hold the entry
            let li = document.createElement('li');
            li.innerHTML = item.name + ' - ' + item.createdBy.name;
            ul.appendChild(li);
            if (
                item.thumbnail !== undefined &&
                item.thumbnail.href !== undefined
            ) {
                // It has an image, so request the thumbnail to be loaded for it
                let img = document.createElement('img');

                //img.setAttribute('src', item.thumbnail.href);
                // Ask onshape to give us a thumbnail image to fill in
                this.getThumbnail(item.thumbnail, 40, 40).then((src) => {
                    img.setAttribute('src', src);
                });
                img.setAttribute('height', '40');
                li.appendChild(img);
            }
        }
    }
    /**
     * Process a single node entry
     * @param uri URI node for the entries to be loaded
     */
    public processNode(uri: string) {
        // Get Onshape to return the list
        this.OnshapeAPIasJSON(uri)
            .then((res) => {
                // When it does, append all the elements to the UI
                this.appendElements(res.items);
                // Do we have any more in the list and are we under the limit for the UI
                if (
                    res.next !== '' &&
                    res.next !== undefined &&
                    this.loaded < this.loadedlimit
                ) {
                    // Request the UI to jump to the next entry in the list.
                    // By calling setTimeout we give the UI a little break
                    setTimeout(() => {
                        this.processNode(res.next);
                    }, 10);
                } else {
                    // All done
                    this.setRunning(false);
                }
            })
            .catch((err) => {
                // Something went wrong, some mark us as no longer running.
                console.log(`**** Call failed: ${err}`);
                this.setRunning(false);
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
}
