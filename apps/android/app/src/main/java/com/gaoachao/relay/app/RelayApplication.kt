package com.gaoachao.relay.app

import android.app.Application
import com.gaoachao.relay.bridge.RelayBridge
import com.lynx.tasm.LynxEnv

class RelayApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        LynxEnv.inst().init(this, null, null, null)
        LynxEnv.inst().registerModule(RelayBridge.MODULE_NAME, RelayBridge::class.java)
    }
}
