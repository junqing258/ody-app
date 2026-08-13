#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface AppNavigationModule : NSObject <RCTBridgeModule>
@end

@implementation AppNavigationModule
RCT_EXPORT_MODULE(AppNavigationModule)

RCT_REMAP_METHOD(closeRN,
                 closeRNWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"OdyApp.closeReactNative" object:nil];
    resolve(@YES);
  });
}

RCT_REMAP_METHOD(openNativeRoute,
                 openNativeRoute:(NSString *)route
                 params:(NSDictionary *)params
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSSet *allowedRoutes = [NSSet setWithObjects:@"home", @"settings", nil];
  if (![allowedRoutes containsObject:route]) {
    reject(@"E_ROUTE_NOT_ALLOWED", @"The requested native route is not allow-listed.", nil);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"OdyApp.openNativeRoute"
                                                        object:nil
                                                      userInfo:@{ @"route": route }];
    resolve(@YES);
  });
}
@end

@interface SessionModule : RCTEventEmitter <RCTBridgeModule>
@end

@implementation SessionModule
RCT_EXPORT_MODULE(SessionModule)

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"sessionChanged" ];
}

RCT_REMAP_METHOD(getSnapshot,
                 getSnapshotWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  // The native session store is the authority. No credential is returned to JS.
  resolve(@{ @"isAuthenticated": @NO });
}
@end

@interface AppInfoModule : NSObject <RCTBridgeModule>
@end

@implementation AppInfoModule
RCT_EXPORT_MODULE(AppInfoModule)

- (NSDictionary *)constantsToExport {
  NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"0.1.0";
  NSString *build = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"] ?: @"1";
  return @{
    @"appVersion": version,
    @"buildNumber": build,
    @"environment": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"ODY_ENV"] ?: @"production",
    @"language": NSLocale.preferredLanguages.firstObject ?: @"en",
  };
}
@end
