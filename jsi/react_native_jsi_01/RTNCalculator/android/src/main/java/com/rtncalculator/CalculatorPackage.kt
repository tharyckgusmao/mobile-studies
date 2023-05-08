package com.rtncalculator;

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

class CalculatorPackage : TurboReactPackage() {
override fun getModule(name: String?, reactContext: ReactApplicationContext): NativeModule? =
  if (name == CalculatorModule.NAME) {
    CalculatorModule(reactContext)
  } else {
    null
  }

override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
  mapOf(
    CalculatorModule.NAME to ReactModuleInfo(
      CalculatorModule.NAME,
      CalculatorModule.NAME,
      false, // canOverrideExistingModule
      false, // needsEagerInit
      true, // hasConstants
      false, // isCxxModule
      true // isTurboModule
    )
  )
}
}