#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface MyComponentViewManager : RCTViewManager
@end

@implementation MyComponentViewManager

RCT_EXPORT_MODULE(MyComponentView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
