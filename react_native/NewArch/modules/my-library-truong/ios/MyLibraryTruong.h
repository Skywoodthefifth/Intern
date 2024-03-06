
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMyLibraryTruongSpec.h"

@interface MyLibraryTruong : NSObject <NativeMyLibraryTruongSpec>
#else
#import <React/RCTBridgeModule.h>

@interface MyLibraryTruong : NSObject <RCTBridgeModule>
#endif

@end
