import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Int "mo:base/Int";

//declare an actor for the whitelist dapp.
//Declare the dapp owner on deployment
actor class whitelistDapp(dappOwner : Principal) = {

    //store the owner of the dapp
    stable let owner : Principal = dappOwner;

    //graduate type
    type Graduate = {
        name : Text;
        principal : Text;
        cohort : Text;
        image : [Nat8];
        level : Text;
    };

    //definition of new cohort
    type Cohort = {
        name : Text;
        runningDate : Text;
    };

    //definition of a review

    type Review = {
        owner : Text;
        cohort : Text;
        review : Text;
    };

    private var adminArray : [Principal] = [];

    private var cohortArray : [Cohort] = [];

    private var reviewArray : [Review] = [];

    private var graduateArray : [Graduate] = [];

    private var imageArray : [Nat8] = [];

    //declare buffer to store sample images
    private var imageBuffer = Buffer.Buffer<[Nat8]>(0);

    //declare buffer storage for admin accounts
    private var adminBuffer = Buffer.Buffer<Principal>(0);

    //declare storage for cohorts
    private var cohortStore = Buffer.Buffer<Cohort>(0);

    //store reviews by the graduate students.
    private var reviewStore = Buffer.Buffer<Review>(0);

    //store graduates
    private var graduateStore = Buffer.Buffer<Graduate>(0);

    //check for admin
    public query func isAdmin(p : Principal) : async Bool {
        if ((p == owner)) {
            return true;
        } else if ((Buffer.contains<Principal>(adminBuffer, p, Principal.equal))) {
            return true;
        } else {
            return false;
        };

    };

    //check for graduate
    public query func isGraduate(p : Principal) : async Bool {
        var isFound : Bool = false;
        for (entry in graduateStore.vals()) {
            if (entry.principal == Principal.toText(p)) {
                isFound := true;
            };
        };

        return isFound;

    };

    //add new cohort by the admin
    public shared ({ caller }) func addCohort(newEntry : Cohort) : async Result.Result<Text, Text> {

        try {

            if (await isAdmin(caller)) {

                cohortStore.add(newEntry);

                #ok("New Cohort Added Successfully");
            } else {
                #err("Operation failed");
            };
        } catch (error) {
            #err(Error.message(error));
        };
    };

    //Delete cohort by the admin
    public shared ({ caller }) func deleteCohort(id : Nat) : async Result.Result<Text, Text> {

        try {

            if (await isAdmin(caller)) {
                let result = cohortStore.remove(id);
                #ok("New Cohort Deleted Successfully");
            } else {
                #err("Operation failed");
            };
        } catch (error) {
            #err(Error.message(error));
        };
    };

    //get all editions
    public func getAllEditions() : async [Cohort] {
        return Buffer.toArray(cohortStore);
    };

    //add a graduate by the admin
    public shared ({ caller }) func addGraduate(name : Text, principal : Text, cohort : Text, level : Text) : async Result.Result<Text, Text> {
        try {
            if (not (await isAdmin(caller))) {
                return #err("Operation failed");
            };

            let newGraduate = {
                name = name;
                principal = principal;
                cohort = cohort;
                level = level;
                image = await imageSelector();
            };

            graduateStore.add(newGraduate);
            return #ok("Graduate added successfully");
        } catch (e) {
            #err(Error.message(e));
        };
    };

    //delete  graduate by the admin
    public shared ({ caller }) func deleteGraduate(id : Nat) : async Result.Result<Text, Text> {
        if (not (await isAdmin(caller))) {
            return #err("Operation failed");
        };

        ignore graduateStore.remove(id);
        return #ok("Graduate deleted successfully");
    };

    // //get a graduate by the admin
    // public shared query ({ caller }) func getGraduate(p : Principal) : async Result.Result<Graduate, Text> {

    //   for (entry in graduateStore.vals()) {
    //     if (entry.principal == Principal.toText(p)) {
    //       return #ok(entry);
    //     };
    //   };
    //   return #err("No Graduate Found");
    // };

    //get all graduates for a particular cohort
    public query func getAllGraduates() : async [Graduate] {

        return Buffer.toArray(graduateStore);
    };

    //bulk upload of graduates by the admin
    public shared ({ caller }) func bulkGraduate(graduates : [Graduate]) : async Result.Result<Text, Text> {

        try {
            if ((await isAdmin(caller)) and graduates.size() > 0) {
                return #err("Err in uploading graduates");
            } else {

                for (entry in graduates.vals()) {
                    graduateStore.add(entry);
                };

                #ok("graduate upload successful");
            };
        } catch (error) {
            #err(Error.message(error));
        };
    };

    //add and delete other admins
    public shared ({ caller }) func addAdmin(newAdmin : Principal) : async Text {

        if (await isAdmin(caller)) {
            if (not Buffer.contains<Principal>(adminBuffer, newAdmin, Principal.equal)) {
                //assert (not Buffer.contains<Principal>(adminBuffer, newAdmin, Principal.equal));
                adminBuffer.add(newAdmin);
                "Admin added successfully";
            } else {
                "User already admin";
            };

        } else {
            "You are not approved to add admins";
        };

    };

    //delete admin
    public shared ({ caller }) func deleteAdmin(admin : Principal) : async Text {

        if (await isAdmin(caller)) {
            var resultText : Text = "";

            for (entry in adminBuffer.vals()) {
                if (entry == admin) {
                    let entryIndex = Buffer.indexOf<Principal>(
                        entry,
                        adminBuffer,
                        Principal.equal,
                    );
                    switch (entryIndex) {
                        case (?index) {
                            ignore adminBuffer.remove(index);
                            resultText := "Admin deleted successfully";
                        };
                        case (null) {
                            resultText := "Admin does not exist";
                        };
                    };

                };
            };
            return resultText;

        } else {
            "You are not approved to delete admins";
        };

    };

    //get all admin IDs
    public shared ({ caller }) func getAdminList() : async [Principal] {
        if (await isAdmin(caller)) {
            Buffer.toArray(adminBuffer);
        } else {
            [];
        };
    };

    //graduate function
    //
    //
    //

    //check for graduate
    public query func graduateDetails(p : Principal) : async Result.Result<Graduate, Text> {

        for (entry in graduateStore.vals()) {
            if (entry.principal == Principal.toText(p)) {
                return #ok(entry);
            };
        };

        return #err("Graduate Not Found");

    };

    //edit image by the graduate
    public shared ({ caller }) func editMyDetails(id : Nat, newImage : [Nat8]) : async Result.Result<Text, Text> {
        try {
            let result = graduateStore.getOpt(id);

            switch (result) {
                case (null) { return #err("Update failed") };
                case (?graduate) {

                    let newDetails = {
                        name = graduate.name;
                        cohort = graduate.cohort;
                        level = graduate.level;
                        image = newImage;
                        principal = graduate.principal;
                    };

                    graduateStore.put(id, newDetails);
                    return #ok("Update Succesffully");
                };
            };

        } catch (error) {
            #err(Error.message(error));
        };

    };

    //add a review by the graduate

    public shared ({ caller }) func addReview(review : Text) : async Result.Result<Text, Text> {
        if ((await isGraduate(caller))) {

            let result = await graduateDetails(caller);
            switch (result) {
                case (#err(value)) { return #err(value) };
                case (#ok(value)) {

                    let newReview = {
                        owner = value.name;
                        cohort = value.cohort;
                        review = review;
                    };

                    reviewStore.add(newReview);
                    #ok("Reveiw Added Successfully")

                };
            };

        } else {
            return #err("Unable to add the review");
        };

    };

    //get all reviews
    public func getAllReviews() : async [Review] {
        return Buffer.toArray(reviewStore);
    };

    // system func preupgrade(){

    //   adminArray    := Iter.toArray(adminBuffer.vals());
    //   cohortArray   := Iter.toArray(cohortStore.vals());
    //   reviewArray   := Iter.toArray(reviewStore.vals());
    //   graduateArray := Iter.toArray(graduateStore.vals());
    //   imageArray    := Iter.toArray(imageBuffer.vals());
    // };

    // system func postupgrade(){
    //   adminBuffer   := Buffer.fromIter<Principal>(adminArray.vals());
    //   cohortStore   := Buffer.fromIter<Cohort>(cohortArray.vals());
    //   reviewStore   := Buffer.fromIter<Review>(reviewArray.vals());
    //   graduateStore := Buffer.fromIter<Graduate>(graduateArray.vals());
    //   imageBuffer := Buffer.fromIter<[Nat8]>(imageArray.vals());
    // };

    //
    public func addImage(img : [[Nat8]]) : async Result.Result<Text, Text> {
        try {

            for (image in img.vals()) {
                imageBuffer.add(image);
            };

            #ok("Sample image added successfully");

        } catch (error) {
            #err(Error.message(error));
        };
    };

    //select a random image from the images uploaded
    public query func imageSelector() : async [Nat8] {
        return imageBuffer.get(Int.abs(Time.now() / 1000 % (imageBuffer.size())));

    };

    //reset all the sample images.

    public query func resetImages() : async Result.Result<Text, Text> {
        try {
            ignore imageBuffer.removeLast();
            #ok("All Sample images have been cleared");

        } catch (error) {
            #err(Error.message(error));
        };
    };

    //get total sample images
    public query func totalSampleImages() : async Nat {
        return imageBuffer.size();
    };
    public shared ({ caller }) func whoami() : async Principal {
        return caller;
    };

};
