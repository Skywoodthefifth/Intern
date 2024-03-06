package com.mycomponent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.MyComponentViewManagerDelegate;
import com.facebook.react.viewmanagers.MyComponentViewManagerInterface;

@ReactModule(name = MyComponentViewManager.NAME)
public class MyComponentViewManager extends SimpleViewManager<MyComponentView>
    implements MyComponentViewManagerInterface<MyComponentView> {

  public static final String NAME = "MyComponentView";

  private final ViewManagerDelegate<MyComponentView> mDelegate;

  public MyComponentViewManager() {
    mDelegate = new MyComponentViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<MyComponentView> getDelegate() {
    return mDelegate;
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public MyComponentView createViewInstance(ThemedReactContext context) {
    return new MyComponentView(context);
  }

  @Override
  @ReactProp(name = "text")
  public void setText(MyComponentView view, String text) {
    view.setText(text);
  }
}
