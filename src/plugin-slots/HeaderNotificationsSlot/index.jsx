import React, { useCallback, useEffect, useRef } from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import NotificationsTray from '@edx/frontend-plugin-notifications';

import { lockBodyScroll } from '../../utils/bodyScrollLock';

const HeaderNotificationsSlot = () => {
  const unlockRef = useRef(null);

  const handleDrawerOpenChange = useCallback((open) => {
    if (open) {
      if (!unlockRef.current) {
        unlockRef.current = lockBodyScroll();
      }
      return;
    }
  }, []);

  const handleDrawerMountedChange = useCallback((mounted) => {
    if (!mounted && unlockRef.current) {
      unlockRef.current();
      unlockRef.current = null;
    }
  }, []);

  useEffect(() => () => {
    if (unlockRef.current) {
      unlockRef.current();
      unlockRef.current = null;
    }
  }, []);

  return (
    <PluginSlot
      id="org.openedx.frontend.layout.header_notifications_tray.v1"
    >
      <NotificationsTray
        onDrawerOpenChange={handleDrawerOpenChange}
        onDrawerMountedChange={handleDrawerMountedChange}
      />
    </PluginSlot>
  );
};

export default HeaderNotificationsSlot;
