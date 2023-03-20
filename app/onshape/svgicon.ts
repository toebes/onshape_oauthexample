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
'use strict';

export type OnshapeSVGIcon =
    | 'svg-icon-AssemblyReplicate'
    | 'svg-icon-ConeAngleLimit'
    | 'svg-icon-HoverMate'
    | 'svg-icon-Incontext-Import-Linked-Deleted'
    | 'svg-icon-SnapMate'
    | 'svg-icon-XLinearLimitMax'
    | 'svg-icon-XLinearLimitMin'
    | 'svg-icon-XRotateLimitMax'
    | 'svg-icon-XRotateLimitMin'
    | 'svg-icon-XYZ-Icons-AlongX'
    | 'svg-icon-XYZ-Icons-AlongY'
    | 'svg-icon-XYZ-Icons-AlongZ'
    | 'svg-icon-XYZ-Icons-AroundX'
    | 'svg-icon-XYZ-Icons-AroundY'
    | 'svg-icon-XYZ-Icons-AroundZ'
    | 'svg-icon-YLinearLimitMax'
    | 'svg-icon-YLinearLimitMin'
    | 'svg-icon-YRotateLimitMax'
    | 'svg-icon-YRotateLimitMin'
    | 'svg-icon-ZLinearLimitMax'
    | 'svg-icon-ZLinearLimitMin'
    | 'svg-icon-ZRotateLimitMax'
    | 'svg-icon-ZRotateLimitMin'
    | 'svg-icon-assembly-insert-button'
    | 'svg-icon-ball'
    | 'svg-icon-bolt'
    | 'svg-icon-bottom-stack'
    | 'svg-icon-context-update-available'
    | 'svg-icon-create-partstudio-incontext'
    | 'svg-icon-cylindrical'
    | 'svg-icon-display-states-button'
    | 'svg-icon-explode-button'
    | 'svg-icon-explode-step-rotation'
    | 'svg-icon-explode-step-spherical'
    | 'svg-icon-explode-step-translation'
    | 'svg-icon-fastened-to-origin-inside'
    | 'svg-icon-fastened-to-origin'
    | 'svg-icon-fastened'
    | 'svg-icon-fastener-autosize'
    | 'svg-icon-gear'
    | 'svg-icon-incontext-active'
    | 'svg-icon-incontext-update-dot'
    | 'svg-icon-insert-item-button'
    | 'svg-icon-linear'
    | 'svg-icon-mate-connector-button'
    | 'svg-icon-mate-connector-qlv-item-active'
    | 'svg-icon-mate-connector-qlv-item'
    | 'svg-icon-mate-contains-limit'
    | 'svg-icon-mateConnector'
    | 'svg-icon-mateGroup'
    | 'svg-icon-named-position-button'
    | 'svg-icon-named-view-button'
    | 'svg-icon-nut'
    | 'svg-icon-parallel'
    | 'svg-icon-pause-dialog'
    | 'svg-icon-planar'
    | 'svg-icon-play-dialog'
    | 'svg-icon-realign-mate-dialog'
    | 'svg-icon-replace-part'
    | 'svg-icon-revolute'
    | 'svg-icon-rigid-assembly-configured'
    | 'svg-icon-rigid-assembly'
    | 'svg-icon-rigid-lock'
    | 'svg-icon-rigid-unlock'
    | 'svg-icon-screw'
    | 'svg-icon-simulation-angular-velocity-button'
    | 'svg-icon-simulation-bearing-force-button'
    | 'svg-icon-simulation-displacement-button'
    | 'svg-icon-simulation-force-button'
    | 'svg-icon-simulation-linear-acceleration-button'
    | 'svg-icon-simulation-moment-button'
    | 'svg-icon-simulation-panel-button'
    | 'svg-icon-simulation-pressure-button'
    | 'svg-icon-simulation-reset-button'
    | 'svg-icon-simulation-status-error'
    | 'svg-icon-simulation-status-ready'
    | 'svg-icon-simulation-status-stale'
    | 'svg-icon-simulation-status-underdefined'
    | 'svg-icon-slider'
    | 'svg-icon-standard-content'
    | 'svg-icon-stop-dialog'
    | 'svg-icon-tangent'
    | 'svg-icon-top-stack'
    | 'svg-icon-unconstrained-assembly'
    | 'svg-icon-washer'
    | 'svg-icon-crosshair-cursor'
    | 'svg-icon-folder-no-drop'
    | 'svg-icon-no-drop'
    | 'svg-icon-project-no-drop'
    | 'svg-icon-add-label-button'
    | 'svg-icon-analytics-panel'
    | 'svg-icon-back-tab'
    | 'svg-icon-bom-table-panel'
    | 'svg-icon-branch-button'
    | 'svg-icon-change-history-button'
    | 'svg-icon-comments-panel-new'
    | 'svg-icon-comments-panel'
    | 'svg-icon-company'
    | 'svg-icon-create-branch-button'
    | 'svg-icon-create-version-button'
    | 'svg-icon-createdByMe'
    | 'svg-icon-debug'
    | 'svg-icon-details-view'
    | 'svg-icon-doc-view'
    | 'svg-icon-document-copies'
    | 'svg-icon-document-details'
    | 'svg-icon-document-likes-active'
    | 'svg-icon-document-likes'
    | 'svg-icon-document-links'
    | 'svg-icon-document-upload-cloud'
    | 'svg-icon-document-upload'
    | 'svg-icon-edu-enterprise'
    | 'svg-icon-educationalPlan'
    | 'svg-icon-enterprise'
    | 'svg-icon-filter-favorite'
    | 'svg-icon-flip-details'
    | 'svg-icon-forward-tab'
    | 'svg-icon-grid-view'
    | 'svg-icon-hamburger-button'
    | 'svg-icon-home-button'
    | 'svg-icon-label'
    | 'svg-icon-list-view'
    | 'svg-icon-menu-button'
    | 'svg-icon-myDocuments'
    | 'svg-icon-navbar-comments-new'
    | 'svg-icon-navbar-comments'
    | 'svg-icon-navbar-help'
    | 'svg-icon-navbar-notifications'
    | 'svg-icon-paste-command'
    | 'svg-icon-perf-panel-error-open'
    | 'svg-icon-perf-panel-error'
    | 'svg-icon-perf-panel-info'
    | 'svg-icon-perf-panel-warn-open'
    | 'svg-icon-perf-panel-warn'
    | 'svg-icon-performance-panel'
    | 'svg-icon-plus-button'
    | 'svg-icon-properties-panel'
    | 'svg-icon-public'
    | 'svg-icon-publication-panel'
    | 'svg-icon-recent-opaque'
    | 'svg-icon-recent-part-studio'
    | 'svg-icon-recentlyOpened'
    | 'svg-icon-revision-history-button'
    | 'svg-icon-search-button'
    | 'svg-icon-share-remove'
    | 'svg-icon-share'
    | 'svg-icon-sharedWithMe'
    | 'svg-icon-sort-button'
    | 'svg-icon-structure-view'
    | 'svg-icon-tab-manager'
    | 'svg-icon-tab-search-button'
    | 'svg-icon-tab-sort-dropdown'
    | 'svg-icon-team'
    | 'svg-icon-trash'
    | 'svg-icon-user-details'
    | 'svg-icon-version-history-graph-button'
    | 'svg-icon-versions-history-panel'
    | 'svg-icon-view-card'
    | 'svg-icon-view-list'
    | 'svg-icon-where-used-all-versions'
    | 'svg-icon-where-used-all'
    | 'svg-icon-where-used-arrow-collapsed-button'
    | 'svg-icon-where-used-arrow-expanded-button'
    | 'svg-icon-where-used-not-used'
    | 'svg-icon-where-used'
    | 'svg-icon-AuxilliaryView-Linked'
    | 'svg-icon-BoMPartProperties'
    | 'svg-icon-BoMTableProperties'
    | 'svg-icon-BrokenOutSection'
    | 'svg-icon-BrokenView-Linked'
    | 'svg-icon-CropView'
    | 'svg-icon-CutlistTableProperties'
    | 'svg-icon-DetailView-Linked'
    | 'svg-icon-DualDimension'
    | 'svg-icon-FlagProperties'
    | 'svg-icon-HideDimensionUnits'
    | 'svg-icon-Inspection'
    | 'svg-icon-Parenthesis'
    | 'svg-icon-ProjectedView-Linked'
    | 'svg-icon-SectionView-Linked'
    | 'svg-icon-ShowDimensionUnits'
    | 'svg-icon-StandardViews'
    | 'svg-icon-addSheet'
    | 'svg-icon-allOver'
    | 'svg-icon-allRound'
    | 'svg-icon-angularity'
    | 'svg-icon-annotationstyle'
    | 'svg-icon-arcLength'
    | 'svg-icon-arrow-dot-left'
    | 'svg-icon-arrow-filled-left'
    | 'svg-icon-arrow-filled'
    | 'svg-icon-arrow-none-left'
    | 'svg-icon-arrow-none'
    | 'svg-icon-arrow-open-left'
    | 'svg-icon-arrow-open'
    | 'svg-icon-arrow-tick-left'
    | 'svg-icon-arrow-tick'
    | 'svg-icon-arrow-unfilled-left'
    | 'svg-icon-arrow-unfilled'
    | 'svg-icon-back'
    | 'svg-icon-baseline'
    | 'svg-icon-bead-weld-symbol'
    | 'svg-icon-between'
    | 'svg-icon-bevel-broad-root-weld-symbol'
    | 'svg-icon-bevel-weld-symbol'
    | 'svg-icon-borderstyles'
    | 'svg-icon-centerRadius'
    | 'svg-icon-circularRunout'
    | 'svg-icon-circularity'
    | 'svg-icon-compositeFrame'
    | 'svg-icon-concentricity'
    | 'svg-icon-continuousFeature'
    | 'svg-icon-create-drawing-button'
    | 'svg-icon-cylindricity'
    | 'svg-icon-diameterSymbol'
    | 'svg-icon-dimension-origin'
    | 'svg-icon-drawing-aligned-section-Linked'
    | 'svg-icon-drawing-aligned-section'
    | 'svg-icon-drawing-angular-dim-line-to-line'
    | 'svg-icon-drawing-auxiliary-view'
    | 'svg-icon-drawing-bom'
    | 'svg-icon-drawing-break-view'
    | 'svg-icon-drawing-callout'
    | 'svg-icon-drawing-centermark'
    | 'svg-icon-drawing-chamfer-dim'
    | 'svg-icon-drawing-cutlist-table'
    | 'svg-icon-drawing-datum'
    | 'svg-icon-drawing-detail-view'
    | 'svg-icon-drawing-diameter-dim'
    | 'svg-icon-drawing-gtol'
    | 'svg-icon-drawing-hole-callout'
    | 'svg-icon-drawing-hole-table'
    | 'svg-icon-drawing-insert-dwg-dxf'
    | 'svg-icon-drawing-insert-dwt'
    | 'svg-icon-drawing-insert-image'
    | 'svg-icon-drawing-insert-view'
    | 'svg-icon-drawing-linear-dim-circles-min-max'
    | 'svg-icon-drawing-linear-dim-line-to-line'
    | 'svg-icon-drawing-linear-dim-point-to-line'
    | 'svg-icon-drawing-linear-dim-point-to-point'
    | 'svg-icon-drawing-note'
    | 'svg-icon-drawing-ordinate-dim'
    | 'svg-icon-drawing-out-of-sync'
    | 'svg-icon-drawing-polygon'
    | 'svg-icon-drawing-projected-view'
    | 'svg-icon-drawing-properties'
    | 'svg-icon-drawing-radial-dim'
    | 'svg-icon-drawing-revision-table'
    | 'svg-icon-drawing-section-view-break-Linked'
    | 'svg-icon-drawing-section-view-break'
    | 'svg-icon-drawing-section-view'
    | 'svg-icon-drawing-sheets'
    | 'svg-icon-drawing-smart-dim'
    | 'svg-icon-drawing-spline-point'
    | 'svg-icon-drawing-spline'
    | 'svg-icon-drawing-surface-finish-symbol'
    | 'svg-icon-drawing-table-anchor-bottom-left'
    | 'svg-icon-drawing-table-anchor-bottom-right'
    | 'svg-icon-drawing-table-anchor-top-left'
    | 'svg-icon-drawing-table-anchor-top-right'
    | 'svg-icon-drawing-table'
    | 'svg-icon-drawing-three-point-circular-centerline'
    | 'svg-icon-drawing-two-edge-linear-centerline'
    | 'svg-icon-drawing-two-point-circular-centerline'
    | 'svg-icon-drawing-two-point-line'
    | 'svg-icon-drawing-two-point-linear-centerline'
    | 'svg-icon-drawing-update'
    | 'svg-icon-drawing-virtual-sharp'
    | 'svg-icon-drawing-weld-symbol'
    | 'svg-icon-dynamic-profile'
    | 'svg-icon-fieldSymbolDown'
    | 'svg-icon-fieldSymbolUp'
    | 'svg-icon-fillet-weld-symbol'
    | 'svg-icon-finish-angular'
    | 'svg-icon-finish-circular'
    | 'svg-icon-finish-multidirectional'
    | 'svg-icon-finish-parallel'
    | 'svg-icon-finish-protruberant'
    | 'svg-icon-finish-radial'
    | 'svg-icon-first-angle'
    | 'svg-icon-flarebevel-weld-symbol'
    | 'svg-icon-flarev-weld-symbol'
    | 'svg-icon-flatness'
    | 'svg-icon-format-painter'
    | 'svg-icon-formatDate'
    | 'svg-icon-formatText'
    | 'svg-icon-four-views-first-angle'
    | 'svg-icon-four-views-third-angle'
    | 'svg-icon-freeState'
    | 'svg-icon-from-to-left'
    | 'svg-icon-from-to-right'
    | 'svg-icon-generalstyles'
    | 'svg-icon-hatch-button'
    | 'svg-icon-horizontal-zones'
    | 'svg-icon-independency'
    | 'svg-icon-insert-sheet-format'
    | 'svg-icon-inspection-items-hide'
    | 'svg-icon-inspection-items'
    | 'svg-icon-inspection-table'
    | 'svg-icon-j-weld-symbol'
    | 'svg-icon-leader'
    | 'svg-icon-leastMaterial'
    | 'svg-icon-linestyles'
    | 'svg-icon-maxMaterial'
    | 'svg-icon-move-down-button'
    | 'svg-icon-move-up-button'
    | 'svg-icon-no-views'
    | 'svg-icon-palette'
    | 'svg-icon-parallelism'
    | 'svg-icon-perpendicularity'
    | 'svg-icon-plug-weld-symbol'
    | 'svg-icon-position'
    | 'svg-icon-profileLine'
    | 'svg-icon-profileSurface'
    | 'svg-icon-projectedToleranceZone'
    | 'svg-icon-radiusSymbol'
    | 'svg-icon-redo'
    | 'svg-icon-regardlessOfSize'
    | 'svg-icon-sheet-height'
    | 'svg-icon-sheet-property'
    | 'svg-icon-sheet-reference-property'
    | 'svg-icon-sheet-width'
    | 'svg-icon-sheets-bend-table-split-Linked'
    | 'svg-icon-sheets-bend-table-split'
    | 'svg-icon-sheets-bend-table'
    | 'svg-icon-sheets-bom-table-split-Linked'
    | 'svg-icon-sheets-bom-table-split'
    | 'svg-icon-sheets-bom-table'
    | 'svg-icon-sheets-hole-table-split-Linked'
    | 'svg-icon-sheets-hole-table-split'
    | 'svg-icon-sheets-hole-table'
    | 'svg-icon-sheets-table-split-Linked'
    | 'svg-icon-sheets-table-split'
    | 'svg-icon-sheets-table'
    | 'svg-icon-sphericalDiameter'
    | 'svg-icon-sphericalRadius'
    | 'svg-icon-spot-face'
    | 'svg-icon-square-weld-symbol'
    | 'svg-icon-square'
    | 'svg-icon-statisticalTolerance'
    | 'svg-icon-straightness'
    | 'svg-icon-strikethrough'
    | 'svg-icon-style-panel'
    | 'svg-icon-surface-finish'
    | 'svg-icon-surfaceFinishNotPermitted'
    | 'svg-icon-surfaceFinishRemoval'
    | 'svg-icon-symbol'
    | 'svg-icon-symmetry'
    | 'svg-icon-tangentPlane'
    | 'svg-icon-third-angle'
    | 'svg-icon-toggle-radial-diameter-dim'
    | 'svg-icon-totalRunout'
    | 'svg-icon-translation'
    | 'svg-icon-u-weld-symbol'
    | 'svg-icon-unilateral'
    | 'svg-icon-unitprecisionstyles'
    | 'svg-icon-v-weld-symbol'
    | 'svg-icon-vertical-zones'
    | 'svg-icon-viewstyles'
    | 'svg-icon-board-flexible'
    | 'svg-icon-board-keepin'
    | 'svg-icon-board-keepout'
    | 'svg-icon-board-linked'
    | 'svg-icon-board-outline'
    | 'svg-icon-board-rigid'
    | 'svg-icon-board'
    | 'svg-icon-boards'
    | 'svg-icon-component-linked'
    | 'svg-icon-ecad-icon'
    | 'svg-icon-export-onshape-button'
    | 'svg-icon-footprint-linked'
    | 'svg-icon-footprint'
    | 'svg-icon-hole-electrical'
    | 'svg-icon-hole-mechanical'
    | 'svg-icon-libraries'
    | 'svg-icon-library-public'
    | 'svg-icon-library'
    | 'svg-icon-mappings'
    | 'svg-icon-no-model'
    | 'svg-icon-outline'
    | 'svg-icon-settings-button'
    | 'svg-icon-viewcube-down-arrow'
    | 'svg-icon-viewcube-rotate-anti'
    | 'svg-icon-viewcube-rotate-clock'
    | 'svg-icon-viewcube-up-arrow'
    | 'svg-icon-assignment'
    | 'svg-icon-binary-element'
    | 'svg-icon-blob-element'
    | 'svg-icon-bom-table-button'
    | 'svg-icon-catia-element'
    | 'svg-icon-creo-element'
    | 'svg-icon-csv-element'
    | 'svg-icon-dae-element'
    | 'svg-icon-doc-element-black'
    | 'svg-icon-doc-element'
    | 'svg-icon-document'
    | 'svg-icon-dropbox-folder'
    | 'svg-icon-dwg-element'
    | 'svg-icon-dwt-element'
    | 'svg-icon-dxf-element'
    | 'svg-icon-feature-studio-element'
    | 'svg-icon-folder'
    | 'svg-icon-geometry-element'
    | 'svg-icon-gif-element'
    | 'svg-icon-glb-element'
    | 'svg-icon-gltf-element'
    | 'svg-icon-google-docs-element'
    | 'svg-icon-google-drive-folder'
    | 'svg-icon-google-forms-element'
    | 'svg-icon-google-sheets-element'
    | 'svg-icon-google-slides-element'
    | 'svg-icon-html-element'
    | 'svg-icon-iges-element'
    | 'svg-icon-image-element'
    | 'svg-icon-inventor-element'
    | 'svg-icon-jpg-element'
    | 'svg-icon-json-element'
    | 'svg-icon-jt-element'
    | 'svg-icon-material-library-element'
    | 'svg-icon-mtl-element'
    | 'svg-icon-obj-element'
    | 'svg-icon-onshape-element-blue'
    | 'svg-icon-pdf-element-red'
    | 'svg-icon-pdf-element'
    | 'svg-icon-png-element'
    | 'svg-icon-ppt-element-black'
    | 'svg-icon-ppt-element'
    | 'svg-icon-project'
    | 'svg-icon-publication'
    | 'svg-icon-pvz-element'
    | 'svg-icon-rhino-element'
    | 'svg-icon-sat-element'
    | 'svg-icon-solid-edge-element'
    | 'svg-icon-solidworks-element'
    | 'svg-icon-step-element'
    | 'svg-icon-stl-element'
    | 'svg-icon-svg-element'
    | 'svg-icon-tutorial-element'
    | 'svg-icon-txt-element'
    | 'svg-icon-variable-studio-element'
    | 'svg-icon-video-element'
    | 'svg-icon-xls-element-black'
    | 'svg-icon-xls-element'
    | 'svg-icon-xmt-element'
    | 'svg-icon-zip-element'
    | 'svg-icon-collapse-search-results'
    | 'svg-icon-evaluate-snippet-button'
    | 'svg-icon-expand-search-results'
    | 'svg-icon-external-fs-feature'
    | 'svg-icon-feature-snippet-button'
    | 'svg-icon-feature-studio-error'
    | 'svg-icon-feature-studio-nowarning'
    | 'svg-icon-feature-studio-warning'
    | 'svg-icon-format-feature-script'
    | 'svg-icon-fs-error'
    | 'svg-icon-fs-ok'
    | 'svg-icon-fs-warning'
    | 'svg-icon-math-snippet-button'
    | 'svg-icon-monitor-part-studio'
    | 'svg-icon-new-feature-snippet'
    | 'svg-icon-out-of-sync'
    | 'svg-icon-parameter-snippet-button'
    | 'svg-icon-query-snippet-button'
    | 'svg-icon-search-small'
    | 'svg-icon-search'
    | 'svg-icon-sketch-snippet-button'
    | 'svg-icon-BoxSelect'
    | 'svg-icon-CreateSelection'
    | 'svg-icon-Select'
    | 'svg-icon-SelectOther'
    | 'svg-icon-action-item'
    | 'svg-icon-action-items'
    | 'svg-icon-add-alias-button'
    | 'svg-icon-add-button'
    | 'svg-icon-add-color-button'
    | 'svg-icon-add-comment'
    | 'svg-icon-add-custom-table'
    | 'svg-icon-add-feature-type'
    | 'svg-icon-add-team-button'
    | 'svg-icon-add-toolbar-feature'
    | 'svg-icon-add-user-button'
    | 'svg-icon-alias-button'
    | 'svg-icon-arrow-down'
    | 'svg-icon-arrow-left'
    | 'svg-icon-arrow-right'
    | 'svg-icon-arrow-up-right'
    | 'svg-icon-arrow-up'
    | 'svg-icon-categories-arena'
    | 'svg-icon-categories-builtin'
    | 'svg-icon-categories-custom'
    | 'svg-icon-center-of-mass'
    | 'svg-icon-change-order'
    | 'svg-icon-change-request'
    | 'svg-icon-clear-field-button'
    | 'svg-icon-close-x'
    | 'svg-icon-collapsed-error'
    | 'svg-icon-collapsed'
    | 'svg-icon-comment-indicator'
    | 'svg-icon-comment-notifications-off'
    | 'svg-icon-comment-notifications-on'
    | 'svg-icon-comments-checkbox'
    | 'svg-icon-comments-checked-checkbox'
    | 'svg-icon-comments-hover-checkbox'
    | 'svg-icon-configure-custom-table'
    | 'svg-icon-copy-button'
    | 'svg-icon-copy-document-URL'
    | 'svg-icon-curve-surface-diagnostic-button'
    | 'svg-icon-delete-button'
    | 'svg-icon-dropdown-arrow'
    | 'svg-icon-duedate'
    | 'svg-icon-edit-button'
    | 'svg-icon-error'
    | 'svg-icon-expanded'
    | 'svg-icon-export-button'
    | 'svg-icon-filter-collapsed-button'
    | 'svg-icon-filter-results-button'
    | 'svg-icon-function'
    | 'svg-icon-green-check'
    | 'svg-icon-help-android'
    | 'svg-icon-help-button'
    | 'svg-icon-help-desktop'
    | 'svg-icon-help-ios'
    | 'svg-icon-help-learning-center'
    | 'svg-icon-help-tip'
    | 'svg-icon-help-troubleshoot'
    | 'svg-icon-help-video'
    | 'svg-icon-hide-panel'
    | 'svg-icon-info'
    | 'svg-icon-list-error-inside-overlay'
    | 'svg-icon-list-error-inside'
    | 'svg-icon-list-error-overlay'
    | 'svg-icon-list-warning-inside'
    | 'svg-icon-markup-arrow-button'
    | 'svg-icon-markup-button'
    | 'svg-icon-markup-circle-button'
    | 'svg-icon-markup-line-button'
    | 'svg-icon-markup-pen-button'
    | 'svg-icon-markup-rectangle-button'
    | 'svg-icon-markup-text-button'
    | 'svg-icon-measure-button'
    | 'svg-icon-missing-selections-overlay'
    | 'svg-icon-new-folder-button'
    | 'svg-icon-notification-fail'
    | 'svg-icon-notification-success'
    | 'svg-icon-open-external-page-small'
    | 'svg-icon-open-external-page'
    | 'svg-icon-open-icon'
    | 'svg-icon-order-ascending'
    | 'svg-icon-order-descending'
    | 'svg-icon-overflow'
    | 'svg-icon-partnumber'
    | 'svg-icon-performance-connection'
    | 'svg-icon-performance-error-inside'
    | 'svg-icon-performance-error-overlay'
    | 'svg-icon-performance-error'
    | 'svg-icon-performance-graphics'
    | 'svg-icon-performance-info-inside'
    | 'svg-icon-performance-info'
    | 'svg-icon-performance-system'
    | 'svg-icon-performance-tip'
    | 'svg-icon-performance-warning-inside'
    | 'svg-icon-performance-warning'
    | 'svg-icon-performance-x'
    | 'svg-icon-poor-connection-status'
    | 'svg-icon-profile-part-studio'
    | 'svg-icon-properties-arena'
    | 'svg-icon-properties-builtin'
    | 'svg-icon-properties-custom'
    | 'svg-icon-refresh-button'
    | 'svg-icon-remove-button-x'
    | 'svg-icon-remove-button'
    | 'svg-icon-report-add-button'
    | 'svg-icon-report-builtin'
    | 'svg-icon-report-custom'
    | 'svg-icon-reset-metadata'
    | 'svg-icon-role-button'
    | 'svg-icon-share-invited'
    | 'svg-icon-show-panel'
    | 'svg-icon-tag-entity-button'
    | 'svg-icon-task-insert-reference'
    | 'svg-icon-tessellation'
    | 'svg-icon-toggle-message'
    | 'svg-icon-tool-new-version-available-overlay'
    | 'svg-icon-treelist-button'
    | 'svg-icon-trigger-plus-button'
    | 'svg-icon-update-later'
    | 'svg-icon-update-now'
    | 'svg-icon-view-cube-button'
    | 'svg-icon-view-preview'
    | 'svg-icon-warning-overlay'
    | 'svg-icon-Onshape-download-file'
    | 'svg-icon-Onshape-email'
    | 'svg-icon-Onshape-monitor'
    | 'svg-icon-Onshape-password-key'
    | 'svg-icon-Onshape-phone'
    | 'svg-icon-assignment-empty'
    | 'svg-icon-class-empty'
    | 'svg-icon-create-new-document-hover'
    | 'svg-icon-create-new-document'
    | 'svg-icon-details-panel-empty'
    | 'svg-icon-explore-sample-document-hover'
    | 'svg-icon-explore-sample-document'
    | 'svg-icon-getting-started-hover'
    | 'svg-icon-getting-started'
    | 'svg-icon-import-flatten'
    | 'svg-icon-import-multi-docs'
    | 'svg-icon-import-part'
    | 'svg-icon-import-single-doc'
    | 'svg-icon-mobile-gesture-context-menu'
    | 'svg-icon-mobile-gesture-double-tap'
    | 'svg-icon-mobile-gesture-pan'
    | 'svg-icon-mobile-gesture-precision-selector'
    | 'svg-icon-mobile-gesture-rotate'
    | 'svg-icon-mobile-gesture-single-tap'
    | 'svg-icon-mobile-gesture-zoom'
    | 'svg-icon-mouse-diagram-onshape'
    | 'svg-icon-mouse-diagram-other'
    | 'svg-icon-notes-empty'
    | 'svg-icon-onshape-container'
    | 'svg-icon-onshape-default-planes'
    | 'svg-icon-onshape-documents-empty'
    | 'svg-icon-performance-panel-empty'
    | 'svg-icon-placeholder-user'
    | 'svg-icon-publication-empty'
    | 'svg-icon-publications-empty-state'
    | 'svg-icon-self-paced-course-hover'
    | 'svg-icon-self-paced-course'
    | 'svg-icon-skeleton-screen'
    | 'svg-icon-upload-image'
    | 'svg-icon-where-used-empty-mobile'
    | 'svg-icon-lui-BOM'
    | 'svg-icon-lui-appearances'
    | 'svg-icon-lui-ar'
    | 'svg-icon-lui-comment-indicator'
    | 'svg-icon-lui-comment-new'
    | 'svg-icon-lui-comment'
    | 'svg-icon-lui-configuration-table-button'
    | 'svg-icon-lui-cutlist-button'
    | 'svg-icon-lui-explode'
    | 'svg-icon-lui-export'
    | 'svg-icon-lui-featurescript-table-button'
    | 'svg-icon-lui-follow-me'
    | 'svg-icon-lui-hole-table'
    | 'svg-icon-lui-home'
    | 'svg-icon-lui-mass-properties'
    | 'svg-icon-lui-measure'
    | 'svg-icon-lui-named-position-button'
    | 'svg-icon-lui-notes'
    | 'svg-icon-lui-pan'
    | 'svg-icon-lui-print'
    | 'svg-icon-lui-properties'
    | 'svg-icon-lui-rotate'
    | 'svg-icon-lui-section-view'
    | 'svg-icon-lui-select-export'
    | 'svg-icon-lui-sheet-metal-table'
    | 'svg-icon-lui-simulation-panel-button'
    | 'svg-icon-lui-zoom-to-fit'
    | 'svg-icon-lui-zoom-window'
    | 'svg-icon-lui-zoom'
    | 'svg-icon-arena-full-color'
    | 'svg-icon-arena-square-full-color'
    | 'svg-icon-beta-overlay'
    | 'svg-icon-box-logo-black'
    | 'svg-icon-box-logo-blue'
    | 'svg-icon-box-logo-white'
    | 'svg-icon-box-onshape-black'
    | 'svg-icon-box-onshape-favicon'
    | 'svg-icon-box-onshape-gray-green'
    | 'svg-icon-box-onshape-gray'
    | 'svg-icon-box-onshape-white-green'
    | 'svg-icon-box-onshape-white'
    | 'svg-icon-dropbox-full'
    | 'svg-icon-dropbox-glyph'
    | 'svg-icon-dropbox-logo'
    | 'svg-icon-google-drive-lockup-gray'
    | 'svg-icon-google-drive-lockup'
    | 'svg-icon-google-drive-logo'
    | 'svg-icon-logo-onshape-black'
    | 'svg-icon-logo-onshape-gray-green-nav-bar'
    | 'svg-icon-logo-onshape-gray-green'
    | 'svg-icon-logo-onshape-gray'
    | 'svg-icon-logo-onshape-white-green'
    | 'svg-icon-logo-onshape-white'
    | 'svg-icon-okta-logo'
    | 'svg-icon-on-logo'
    | 'svg-icon-on-round'
    | 'svg-icon-onedrive-logo-black'
    | 'svg-icon-onedrive-logo-blue'
    | 'svg-icon-onedrive-logo-white'
    | 'svg-icon-onedrive-logo'
    | 'svg-icon-onshape-collaborator'
    | 'svg-icon-onshape-favicon'
    | 'svg-icon-onshape-logo-collaborator'
    | 'svg-icon-onshape-logo-white'
    | 'svg-icon-onshape-logo'
    | 'svg-icon-saml'
    | 'svg-icon-actions-gear-button'
    | 'svg-icon-add-appearance-button'
    | 'svg-icon-add-variable-button'
    | 'svg-icon-add-variablestudio-button'
    | 'svg-icon-appearances-button'
    | 'svg-icon-assign-variable-button'
    | 'svg-icon-auto-variable-reference'
    | 'svg-icon-boolean-bodies-button'
    | 'svg-icon-boundary-surface-button'
    | 'svg-icon-bridging-curve-button'
    | 'svg-icon-c-plane-button'
    | 'svg-icon-cancel-button'
    | 'svg-icon-chamfer-button'
    | 'svg-icon-circular-pattern-button'
    | 'svg-icon-composite-curve-button'
    | 'svg-icon-configuration-button'
    | 'svg-icon-configuration-checkbox-button'
    | 'svg-icon-configuration-list-button'
    | 'svg-icon-configuration-table-button'
    | 'svg-icon-configuration-text-button'
    | 'svg-icon-configuration-variable-button'
    | 'svg-icon-create-selection-button'
    | 'svg-icon-cuboid-button'
    | 'svg-icon-curve-pattern-button'
    | 'svg-icon-cutlist-button'
    | 'svg-icon-decal-button'
    | 'svg-icon-default-plane-button'
    | 'svg-icon-delete-bodies-button'
    | 'svg-icon-delete-face-button'
    | 'svg-icon-draft-button'
    | 'svg-icon-enclose-button'
    | 'svg-icon-endcap-button'
    | 'svg-icon-extend-surface-button'
    | 'svg-icon-external-thread-button'
    | 'svg-icon-extrude-button'
    | 'svg-icon-featurescript-table-button'
    | 'svg-icon-fill-button'
    | 'svg-icon-fillet-button'
    | 'svg-icon-fit-spline-button'
    | 'svg-icon-flattened-part'
    | 'svg-icon-flip-direction-opposite'
    | 'svg-icon-flip-direction'
    | 'svg-icon-flip-rotation-opposite'
    | 'svg-icon-flip-rotation'
    | 'svg-icon-frame-button'
    | 'svg-icon-frame-trim-button'
    | 'svg-icon-function-button'
    | 'svg-icon-gusset-button'
    | 'svg-icon-helix-button'
    | 'svg-icon-hole-button'
    | 'svg-icon-hole-counter-bore-depth'
    | 'svg-icon-hole-counter-bore-diameter'
    | 'svg-icon-hole-counter-sink-angle'
    | 'svg-icon-hole-counter-sink-diameter'
    | 'svg-icon-hole-depth'
    | 'svg-icon-hole-diameter'
    | 'svg-icon-hole-drill-angle'
    | 'svg-icon-hole-table'
    | 'svg-icon-hole-tap-clearance'
    | 'svg-icon-hole-tap-diameter'
    | 'svg-icon-hole-tapped-depth'
    | 'svg-icon-hole-tolerance-precision'
    | 'svg-icon-import-derived-button'
    | 'svg-icon-import-foreign-button'
    | 'svg-icon-insert-variable-button'
    | 'svg-icon-intersection-curve-button'
    | 'svg-icon-linear-pattern-button'
    | 'svg-icon-loft-button'
    | 'svg-icon-mass-properties'
    | 'svg-icon-mirror-button'
    | 'svg-icon-modify-fillet-button'
    | 'svg-icon-move-face-button'
    | 'svg-icon-mutual-trim-button'
    | 'svg-icon-offset-surface-button'
    | 'svg-icon-ok-button'
    | 'svg-icon-origin-button'
    | 'svg-icon-partial-variable-reference'
    | 'svg-icon-pi-button'
    | 'svg-icon-project-curves-button'
    | 'svg-icon-redo-button'
    | 'svg-icon-reorder-items-button'
    | 'svg-icon-replace-face-button'
    | 'svg-icon-revolve-button'
    | 'svg-icon-rib-button'
    | 'svg-icon-ruled-surface-button'
    | 'svg-icon-sheet-metal-bend-relief-button'
    | 'svg-icon-sheet-metal-corner-button'
    | 'svg-icon-sheet-metal-end-button'
    | 'svg-icon-sheet-metal-flange-button'
    | 'svg-icon-sheet-metal-hem-button'
    | 'svg-icon-sheet-metal-joint-button'
    | 'svg-icon-sheet-metal-make-joint-button'
    | 'svg-icon-sheet-metal-start-button'
    | 'svg-icon-sheet-metal-tab-button'
    | 'svg-icon-sheet-metal-table-button'
    | 'svg-icon-shell-button'
    | 'svg-icon-sphere-button'
    | 'svg-icon-split-part-button'
    | 'svg-icon-sweep-button'
    | 'svg-icon-tag-profile-button'
    | 'svg-icon-thicken-button'
    | 'svg-icon-times'
    | 'svg-icon-transform-button'
    | 'svg-icon-undo-button'
    | 'svg-icon-units-button'
    | 'svg-icon-variable-table-button'
    | 'svg-icon-wrap-button'
    | 'svg-icon-default-assembly'
    | 'svg-icon-default-assignment'
    | 'svg-icon-default-binary-element'
    | 'svg-icon-default-blob-element'
    | 'svg-icon-default-catia-element'
    | 'svg-icon-default-class'
    | 'svg-icon-default-composite-part-button'
    | 'svg-icon-default-creo-element'
    | 'svg-icon-default-csv-element'
    | 'svg-icon-default-curve'
    | 'svg-icon-default-dae-element'
    | 'svg-icon-default-doc-element-black'
    | 'svg-icon-default-doc-element'
    | 'svg-icon-default-document'
    | 'svg-icon-default-drawing'
    | 'svg-icon-default-dwg-element'
    | 'svg-icon-default-dwt-element'
    | 'svg-icon-default-dxf-element'
    | 'svg-icon-default-feature-studio-element'
    | 'svg-icon-default-file'
    | 'svg-icon-default-folder'
    | 'svg-icon-default-geometry-element'
    | 'svg-icon-default-gif-element'
    | 'svg-icon-default-glb-element'
    | 'svg-icon-default-gltf-element'
    | 'svg-icon-default-google-docs-element'
    | 'svg-icon-default-google-forms-element'
    | 'svg-icon-default-google-sheets-element'
    | 'svg-icon-default-google-slides-element'
    | 'svg-icon-default-html-element'
    | 'svg-icon-default-iges-element'
    | 'svg-icon-default-image-element'
    | 'svg-icon-default-inventor-element'
    | 'svg-icon-default-item'
    | 'svg-icon-default-jpg-element'
    | 'svg-icon-default-json-element'
    | 'svg-icon-default-jt-element'
    | 'svg-icon-default-material-library-element'
    | 'svg-icon-default-mesh'
    | 'svg-icon-default-mtl-element'
    | 'svg-icon-default-obj-element'
    | 'svg-icon-default-part'
    | 'svg-icon-default-partstudio'
    | 'svg-icon-default-pdf-element'
    | 'svg-icon-default-plane'
    | 'svg-icon-default-png-element'
    | 'svg-icon-default-ppt-element-black'
    | 'svg-icon-default-ppt-element'
    | 'svg-icon-default-project'
    | 'svg-icon-default-publication'
    | 'svg-icon-default-pvz-element'
    | 'svg-icon-default-renderstudio'
    | 'svg-icon-default-rhino-element'
    | 'svg-icon-default-sat-element'
    | 'svg-icon-default-sketch'
    | 'svg-icon-default-solid-edge-element'
    | 'svg-icon-default-solidworks-element'
    | 'svg-icon-default-step-element'
    | 'svg-icon-default-stl-element'
    | 'svg-icon-default-surface'
    | 'svg-icon-default-svg-element'
    | 'svg-icon-default-txt-element'
    | 'svg-icon-default-variablestudio'
    | 'svg-icon-default-video-element'
    | 'svg-icon-default-xls-element-black'
    | 'svg-icon-default-xls-element'
    | 'svg-icon-default-xmt-element'
    | 'svg-icon-default-zip-element'
    | 'svg-icon-auto-height-button'
    | 'svg-icon-maximize-scene-window-button'
    | 'svg-icon-render-appearances-panel'
    | 'svg-icon-render-environment-panel'
    | 'svg-icon-render-scene-button'
    | 'svg-icon-renderstudio-icon'
    | 'svg-icon-transform-step-scale'
    | 'svg-icon-add-control-point'
    | 'svg-icon-add-spline-handle'
    | 'svg-icon-add-spline-point'
    | 'svg-icon-equal-curvature'
    | 'svg-icon-inflection-point'
    | 'svg-icon-new-sketch-button'
    | 'svg-icon-sketch-aligned-rectangle-button'
    | 'svg-icon-sketch-arc-button'
    | 'svg-icon-sketch-bezier-button'
    | 'svg-icon-sketch-center-arc-button'
    | 'svg-icon-sketch-center-rectangle-button'
    | 'svg-icon-sketch-circle-button'
    | 'svg-icon-sketch-circumscribed-polygon-button'
    | 'svg-icon-sketch-coincident-button'
    | 'svg-icon-sketch-concentric-button'
    | 'svg-icon-sketch-conic-button'
    | 'svg-icon-sketch-construction-button'
    | 'svg-icon-sketch-cpattern-button'
    | 'svg-icon-sketch-dimension-button'
    | 'svg-icon-sketch-ellipse-button'
    | 'svg-icon-sketch-equal-button'
    | 'svg-icon-sketch-extend-button'
    | 'svg-icon-sketch-fillet-button'
    | 'svg-icon-sketch-fix-button'
    | 'svg-icon-sketch-flip-horizontal-button'
    | 'svg-icon-sketch-flip-vertical-button'
    | 'svg-icon-sketch-horizontal-button'
    | 'svg-icon-sketch-image-rectangle-button'
    | 'svg-icon-sketch-inscribed-polygon-button'
    | 'svg-icon-sketch-intersection-button'
    | 'svg-icon-sketch-line-segment-button'
    | 'svg-icon-sketch-lpattern-button'
    | 'svg-icon-sketch-midpoint-button'
    | 'svg-icon-sketch-mirror-button'
    | 'svg-icon-sketch-normal-button'
    | 'svg-icon-sketch-offset-button'
    | 'svg-icon-sketch-parallel-button'
    | 'svg-icon-sketch-perimeter-circle-button'
    | 'svg-icon-sketch-perpendicular-button'
    | 'svg-icon-sketch-pierce-button'
    | 'svg-icon-sketch-point-button'
    | 'svg-icon-sketch-rectangle-button'
    | 'svg-icon-sketch-slot-button'
    | 'svg-icon-sketch-spline-button'
    | 'svg-icon-sketch-symmetric-button'
    | 'svg-icon-sketch-tangent-arc-button'
    | 'svg-icon-sketch-tangent-button'
    | 'svg-icon-sketch-text-rectangle-button'
    | 'svg-icon-sketch-transform-button'
    | 'svg-icon-sketch-trim-button'
    | 'svg-icon-sketch-use-button'
    | 'svg-icon-sketch-vertical-button'
    | 'svg-icon-assembly-configured'
    | 'svg-icon-assembly'
    | 'svg-icon-composite-part-button-configured'
    | 'svg-icon-composite-part-button'
    | 'svg-icon-curve-configured'
    | 'svg-icon-curve'
    | 'svg-icon-drawing'
    | 'svg-icon-flattened-part-configured'
    | 'svg-icon-import-derived-configured-button'
    | 'svg-icon-item-element'
    | 'svg-icon-mesh-configured'
    | 'svg-icon-mesh'
    | 'svg-icon-part-configured'
    | 'svg-icon-part-mesh-configured'
    | 'svg-icon-part-mesh'
    | 'svg-icon-part'
    | 'svg-icon-partstudio-configured'
    | 'svg-icon-partstudio'
    | 'svg-icon-sketch-configured'
    | 'svg-icon-sketch'
    | 'svg-icon-surface-configured'
    | 'svg-icon-surface-mesh-configured'
    | 'svg-icon-surface-mesh'
    | 'svg-icon-surface'
    | 'svg-icon-variablestudio'
    | 'svg-icon-auto-obsolete'
    | 'svg-icon-auto-version'
    | 'svg-icon-child-revisioned-new'
    | 'svg-icon-child-versioned-new'
    | 'svg-icon-compare-versions-button'
    | 'svg-icon-create-release-button'
    | 'svg-icon-inserted-version-child-new'
    | 'svg-icon-inserted-version-child-out-of-date'
    | 'svg-icon-inserted-version-child-pin-new'
    | 'svg-icon-inserted-version-lock-child-out-of-date'
    | 'svg-icon-inserted-version-lock-new-version'
    | 'svg-icon-inserted-version-lock'
    | 'svg-icon-inserted-version-pin-child-out-of-date'
    | 'svg-icon-inserted-version-pin-new'
    | 'svg-icon-inserted-version-pin'
    | 'svg-icon-inserted-version-update'
    | 'svg-icon-inserted-version'
    | 'svg-icon-inside-linked-child-new'
    | 'svg-icon-inside-linked-child-pin-new'
    | 'svg-icon-latest-revision'
    | 'svg-icon-legend-change-node'
    | 'svg-icon-legend-version-node'
    | 'svg-icon-legend-workspace-node'
    | 'svg-icon-linked-document-lock-child-out-of-date'
    | 'svg-icon-linked-document-lock-new-version'
    | 'svg-icon-linked-document-lock'
    | 'svg-icon-linked-document-update'
    | 'svg-icon-microversion'
    | 'svg-icon-obsolete'
    | 'svg-icon-pending'
    | 'svg-icon-pin-general'
    | 'svg-icon-pin-inserted-version-child-new'
    | 'svg-icon-pin-revisioned-document-child-new'
    | 'svg-icon-refresh-release-button'
    | 'svg-icon-released'
    | 'svg-icon-revision-assy-child-out-of-date'
    | 'svg-icon-revision-child-out-of-date'
    | 'svg-icon-revision-link-child-out-of-date'
    | 'svg-icon-revision-lock-new'
    | 'svg-icon-revision-lock'
    | 'svg-icon-revision-obsolete'
    | 'svg-icon-revision-pending'
    | 'svg-icon-revision'
    | 'svg-icon-revisioned-document-child-new'
    | 'svg-icon-revisioned-document-new'
    | 'svg-icon-revisioned-document-pin-new'
    | 'svg-icon-revisioned-document-pin'
    | 'svg-icon-revisioned-document'
    | 'svg-icon-selectivemerge-keep-left-discard'
    | 'svg-icon-selectivemerge-keep-left'
    | 'svg-icon-selectivemerge-merge-left'
    | 'svg-icon-selectivemerge-take-left-discard'
    | 'svg-icon-selectivemerge-take-left'
    | 'svg-icon-switch-reference-button'
    | 'svg-icon-tab-out-of-date-linked-assy-lock'
    | 'svg-icon-tab-out-of-date-linked-assy'
    | 'svg-icon-tab-out-of-date-sub-assy-lock'
    | 'svg-icon-tab-out-of-date-sub-assy'
    | 'svg-icon-tab-out-of-date'
    | 'svg-icon-update-all-button'
    | 'svg-icon-version-graph-button'
    | 'svg-icon-version'
    | 'svg-icon-workspace'
    | 'svg-icon-arrow-dot'
    | 'svg-icon-mesh-contents';

export function createSVGIcon(icon: OnshapeSVGIcon, iconclass?: string) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svg.classList.add('os-svg-icon');
    if (iconclass !== undefined) {
        svg.classList.add(iconclass);
    }
    use.setAttribute('href', '#' + String(icon));
    svg.appendChild(use);
    return svg;
}
