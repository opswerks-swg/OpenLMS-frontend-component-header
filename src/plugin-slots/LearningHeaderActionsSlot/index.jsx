import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot/index';
import LearningHelpSlot from '../LearningHelpSlot/index';

const LearningHeaderActionsSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v1"
  >
    <HeaderNotificationsSlot />
    <LearningHelpSlot />
  </PluginSlot>
);

export default LearningHeaderActionsSlot;
