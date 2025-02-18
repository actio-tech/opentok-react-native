//
//  OTSubscriberView.swift
//  OpenTokReactNative
//
//  Created by Manik Sachdeva on 1/18/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(OTSubscriberView)
class OTSubscriberView: UIView {
  @objc var streamId: NSString? {
    didSet {
      if let subscriberView = OTRN.sharedState.subscribers[streamId! as String]?.view {
        subscriberView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(subscriberView)
      }
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

