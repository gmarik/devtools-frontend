// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';
import {describe, it} from 'mocha';

import {getBrowserAndPages} from '../../shared/helper.js';
import {getTotalTimeFromSummary, navigateToPerformanceTab, startRecording, stopRecording} from '../helpers/performance-helpers.js';

describe('The Performance panel', () => {
  it('can start and stop a new recording', async () => {
    const {target} = getBrowserAndPages();
    await navigateToPerformanceTab(target, 'empty');

    await startRecording();
    await stopRecording();

    // Check that the recording shows the pie chart with a non 0 total time.
    const totalTime = await getTotalTimeFromSummary();
    assert.isAbove(totalTime, 0, 'The recording was created successfully');
  });
});