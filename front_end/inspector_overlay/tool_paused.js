// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// @ts-nocheck
// TODO(crbug.com/1011811): Enable TypeScript compiler checks

import {dispatch, reset, setPlatform} from './common.js';
import {drawPausedInDebuggerMessage, initListeners} from './tool_paused_impl.js';

const style = `
body {
  background-color: rgba(0, 0, 0, 0.31);
 }

 .controls-line {
  display: flex;
  justify-content: center;
  margin: 10px 0;
 }

 .message-box {
  padding: 2px 4px;
  display: flex;
  align-items: center;
  cursor: default;
  overflow: hidden;
 }

 #paused-in-debugger {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
 }

 .controls-line > * {
  background-color: rgb(255, 255, 194);
  border: 1px solid rgb(202, 202, 202);
  height: 22px;
  box-sizing: border-box;
 }

 .controls-line .button {
  width: 26px;
  margin-left: -1px;
  margin-right: 0;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: pointer;
 }

 .controls-line .button .glyph {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0.8;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  position: relative;
 }

 .controls-line .button:active .glyph {
  top: 1px;
  left: 1px;
 }

 #resume-button .glyph {
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAYAAABv7tTEAAAAAXNSR0IArs4c6QAAAFJJREFUKM+10bEJgGAMBeEPbR3BLRzEVdzEVRzELRzBVohVwEJ+iODBlQfhBeJhsmHU4C0KnFjQV6J0x1SNAhdWDJUoPTB3PvLLeaUhypM3n3sD/qc7lDrdpIEAAAAASUVORK5CYII=);
  -webkit-mask-size: 13px 10px;
  background-color: rgb(66, 129, 235);
 }

 #step-over-button .glyph {
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAAXNSR0IArs4c6QAAAOFJREFUKM+N0j8rhXEUB/DPcxW35CqhvIBrtqibkklhV8qkTHe4ZbdblcXgPVhuMdqUTUl5A2KRRCF5LGc4PT1P7qnfcr5/zu/8KdTHLFaxjHnc4RZXKI0QYxjgLQTVd42l/0wmg5iFX3iq5H6w22RS4DyRH7CB8cAXcBTGJT6xUmd0mEwuMdFQcA3fwXvGTAan8BrgPabTL9fRRyfx91PRMwyjGwcJ2EyCfsrfpPw2Pipz24NT/MZciiQYVshzOKnZ5Hturxt3k2MnCpS4SPkeHpPR8Sh3tYgttBoW9II2/AHiaEqvD2Fc0wAAAABJRU5ErkJggg==);
  -webkit-mask-size: 18px 10px;
 }
 `;


window.setPlatform = function(platform) {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = style;
  document.head.append(styleTag);

  const controlsLine = document.createElement('div');
  controlsLine.classList.add('controls-line');

  const messageBox = document.createElement('div');
  messageBox.classList.add('message-box');
  const pausedInDebugger = document.createElement('div');
  pausedInDebugger.id = 'paused-in-debugger';
  messageBox.append(pausedInDebugger);
  controlsLine.append(messageBox);

  const resumeButton = document.createElement('div');
  resumeButton.id = 'resume-button';
  resumeButton.title = 'Resume script execution (F8).';
  resumeButton.classList.add('button');
  const glyph = document.createElement('div');
  glyph.classList.add('glyph');
  resumeButton.append(glyph);
  controlsLine.append(resumeButton);

  const stepOverButton = document.createElement('div');
  stepOverButton.id = 'step-over-button';
  stepOverButton.title = 'Step over next function call (F10).';
  stepOverButton.classList.add('button');
  const glyph2 = document.createElement('div');
  glyph2.classList.add('glyph');
  stepOverButton.append(glyph2);
  controlsLine.append(stepOverButton);

  document.body.append(controlsLine);

  initListeners();

  resumeButton.addEventListener('click', () => InspectorOverlayHost.send('resume'));
  stepOverButton.addEventListener('click', () => InspectorOverlayHost.send('stepOver'));

  setPlatform(platform);
};

window.reset = function(data) {
  reset(data);
};
window.drawPausedInDebuggerMessage = drawPausedInDebuggerMessage;
window.dispatch = dispatch;
