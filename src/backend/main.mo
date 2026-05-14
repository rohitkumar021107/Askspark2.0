import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

actor {
  type UserRole = AccessControl.UserRole;

  module Doubt {
    public func compareByTimestamp(d1 : Doubt, d2 : Doubt) : Order.Order {
      Int.compare(d1.timestamp, d2.timestamp);
    };

    public func compareById(d1 : Doubt, d2 : Doubt) : Order.Order {
      Text.compare(d1.id, d2.id);
    };
  };

  type Doubt = {
    id : Text;
    text : Text;
    image : ?Storage.ExternalBlob;
    isAnonymous : Bool;
    timestamp : Time.Time;
    isAnswered : Bool;
    teacherResponse : ?Text;
    studentSubmitter : ?Principal;
  };

  type AppRole = {
    #student;
    #teacher;
  };

  type UserProfile = {
    role : ?AppRole;
    displayName : Text;
    doubtsSubmitted : Nat;
  };

  module UserProfile {
    public func compare(u1 : UserProfile, u2 : UserProfile) : Order.Order {
      Text.compare(u1.displayName, u2.displayName);
    };
  };

  public type DoubtSubmission = {
    text : Text;
    image : ?Storage.ExternalBlob;
    isAnonymous : Bool;
  };

  let doubts = Map.empty<Text, Doubt>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // Helper function to check if user is a teacher
  func isTeacher(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.role) {
          case (?#teacher) { true };
          case (_) { false };
        };
      };
      case (null) { false };
    };
  };

  // Helper function to check if user is a student
  func isStudent(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.role) {
          case (?#student) { true };
          case (_) { false };
        };
      };
      case (null) { false };
    };
  };

  // Helper function to check if user has a profile
  func _hasProfile(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (?_) { true };
      case (null) { false };
    };
  };

  public shared ({ caller }) func submitDoubt(submission : DoubtSubmission) : async Text {
    // Only authenticated users can submit doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can submit doubts");
    };

    // Only students can submit doubts
    if (not isStudent(caller)) {
      Runtime.trap("Unauthorized: Only students can submit doubts");
    };

    let id = generateId(caller);
    let newDoubt : Doubt = {
      id;
      text = submission.text;
      image = submission.image;
      timestamp = Time.now();
      isAnonymous = submission.isAnonymous;
      isAnswered = false;
      teacherResponse = null;
      studentSubmitter = ?caller;
    };

    doubts.add(id, newDoubt);

    switch (userProfiles.get(caller)) {
      case (?profile) {
        userProfiles.add(caller, {
          role = profile.role;
          displayName = profile.displayName;
          doubtsSubmitted = profile.doubtsSubmitted + 1;
        });
      };
      case (null) {};
    };

    id;
  };

  public query ({ caller }) func getDoubt(id : Text) : async Doubt {
    // Only authenticated users can view doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view doubts");
    };

    let doubt = doubts.get(id);
    switch (doubt) {
      case (null) { Runtime.trap("Doubt does not exist") };
      case (?d) {
        // Teachers can view all doubts, students can view their own or anonymous doubts
        if (isTeacher(caller) or d.studentSubmitter == ?caller) {
          return d;
        } else {
          Runtime.trap("Unauthorized: Cannot access this doubt");
        };
      };
    };
  };

  public query ({ caller }) func getAllDoubts() : async [Doubt] {
    // Only authenticated users can view all doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view doubts");
    };

    // Only teachers can view all doubts
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can view all doubts");
    };

    doubts.values().toArray().sort(Doubt.compareByTimestamp);
  };

  public query ({ caller }) func getUnansweredDoubts() : async [Doubt] {
    // Only authenticated users can view unanswered doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view doubts");
    };

    // Only teachers can view unanswered doubts
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can view unanswered doubts");
    };

    doubts.values().toArray().filter(func(doubt) { not doubt.isAnswered }).sort(Doubt.compareByTimestamp);
  };

  public query ({ caller }) func getCallerDoubts() : async [Doubt] {
    // Only authenticated users can view their doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view their doubts");
    };

    // Only students can view their own doubts
    if (not isStudent(caller)) {
      Runtime.trap("Unauthorized: Only students can view their doubts");
    };

    doubts.values().toArray().filter(func(doubt) { doubt.studentSubmitter == ?caller }).sort(Doubt.compareByTimestamp);
  };

  public shared ({ caller }) func answerDoubt(doubtId : Text, response : Text) : async () {
    // Only authenticated users can answer doubts
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can answer doubts");
    };

    // Only teachers can answer doubts
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can answer doubts");
    };

    let updatedDoubt = switch (doubts.get(doubtId)) {
      case (null) { Runtime.trap("Doubt not found: " # doubtId) };
      case (?doubt) {
        {
          doubt with
          isAnswered = true;
          teacherResponse = ?response;
        };
      };
    };
    doubts.add(doubtId, updatedDoubt);
  };

  public shared ({ caller }) func submitUserProfile(displayName : Text, role : AppRole) : async () {
    // Only authenticated users can create profiles
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can create profiles");
    };

    let existingProfile = userProfiles.get(caller);
    let doubtsCount = switch (existingProfile) {
      case (?profile) { profile.doubtsSubmitted };
      case (null) { 0 };
    };

    userProfiles.add(
      caller,
      {
        displayName;
        role = ?role;
        doubtsSubmitted = doubtsCount;
      },
    );
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    // Only authenticated users can view their profile
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    userProfiles.get(caller);
  };

  public query ({ caller = _ }) func saveCallerUserProfile(_profile : UserProfile) : async () {
    Runtime.trap("Not implemented: Use submitUserProfile instead");
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Only authenticated users can view profiles
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    // Users can view their own profile, admins can view any profile
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    userProfiles.get(user);
  };

  public query ({ caller }) func getProfileByPrincipal(user : Principal) : async ?UserProfile {
    // Only authenticated users can view profiles
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    // Users can view their own profile, teachers and admins can view any profile
    if (caller != user and not isTeacher(caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Insufficient permissions to view this profile");
    };

    userProfiles.get(user);
  };

  public query ({ caller }) func getAllUserProfiles() : async [UserProfile] {
    // Only authenticated users can view all profiles
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    // Only teachers and admins can view all profiles
    if (not isTeacher(caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only teachers can view all profiles");
    };

    userProfiles.values().toArray().sort();
  };

  public query ({ caller }) func getTeacherNotificationCount() : async Nat {
    // Only authenticated users can view notification count
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view notifications");
    };

    // Only teachers can view notification count
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can view notification count");
    };

    doubts.toArray().filter(func((_, doubt)) { not doubt.isAnswered }).size();
  };

  public query ({ caller }) func getStudentConfidenceScore(user : Principal) : async Nat {
    // Only authenticated users can view confidence scores
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view confidence scores");
    };

    // Users can view their own score, teachers and admins can view any score
    if (caller != user and not isTeacher(caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Insufficient permissions to view this confidence score");
    };

    switch (userProfiles.get(user)) {
      case (?profile) {
        let score = profile.doubtsSubmitted * 10;
        if (score > 100) { 100 } else { score };
      };
      case (null) { 0 };
    };
  };

  public query ({ caller }) func getCallerConfidenceScore() : async Nat {
    // Only authenticated users can view their confidence score
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view their confidence score");
    };

    let user = caller;
    switch (userProfiles.get(user)) {
      case (?profile) {
        let score = profile.doubtsSubmitted * 10;
        if (score > 100) { 100 } else { score };
      };
      case (null) { 0 };
    };
  };

  func generateId(caller : Principal) : Text {
    Time.now().toText() # "_" # caller.toText();
  };
};
