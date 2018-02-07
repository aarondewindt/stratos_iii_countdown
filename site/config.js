/**
 * Created by elviento on 12/16/16.
 */


// "2017-10-10 10:10:10"
var launch = new Launch("2017-10-10 10:10:10");
var start_date = new Date("2016-9-1");

var n_show = 10;
var today = new Date();

// Milestone(name, deadline, remove_date, show_marker, marker_shift)
var milestones = [
    new Milestone("Start of the Project", "2016-9-1", "2016-12-21 23:59", 2, -40),

    // new Milestone("Core Team Selected", "2016-9-1"),
    new Milestone("Baseline Design done", "2016-11-1", undefined, 1, 0),
    new Milestone("Requirements defined", "2016-11-1"),
    new Milestone("Stratos II+ Electronics running", "2017-1-8"),
    // new Milestone("PR Plan is done", "2017-1-15"),
    // new Milestone("Test Site aquired", "2017-1-15"),
    new Milestone("Detailed Engine Design", "2017-1-22", undefined, 1, -50),
    new Milestone("Liner Material and Diameter Set", "2017-1-22"),
    new Milestone("Initial Flight Simulations done", "2017-1-25"),
    new Milestone("Production Methods Engine verified", "2017-2-12"),
    new Milestone("Preliminary Design", "2017-2-19", undefined, 2, 0),
    new Milestone("Payloads defined (size and number)", "2017-2-19"),
    new Milestone("Pre Engine Tests completed", "2017-2-22"),
    new Milestone("Structure Prototypes done", "2017-2-26"),
    new Milestone("Data acquisition finished", "2017-3-5"),
    new Milestone("Test Subsystems finished", "2017-3-12"),
    new Milestone("Engine Test Dress Rehearsal", "2017-3-22"),
    new Milestone("Prototype testing done", "2017-3-22"),
    new Milestone("First Full Scale Tests", "2017-3-30", "2017-4-11 23:59", 1, -30),

    new Milestone("CDR reports delivery", "2017-4-30", undefined, 2, 0),
    new Milestone("CDR reports revision", "2017-5-7"),
    new Milestone("Critical design reviews", "2017-5-14", "2017-5-31", 1, 50)

    /*
    new Milestone("Transport for Testing arranged", "2017-3-27"),
    new Milestone("Tank prototype tested", "2017-4-9"),
    // new Milestone("Launch Site arranged", "2017-4-15"),
    new Milestone("Critical Design Review", "2017-4-30", undefined, 2, 0),
    new Milestone("Composite CC produced and tested", "2017-4-30"),
    // new Milestone("Budget is filled", "2017-4-30"),
    new Milestone("Flight Engine is verified", "2017-5-1"),
    new Milestone("Monte Carlo Analysis", "2017-5-14"),
    new Milestone("Design freeze", "2017-5-14", undefined, 1, 0),
    new Milestone("Structural Elements Produced", "2017-6-15"),
    // new Milestone("Insurance is signed", "2017-6-15"),
    new Milestone("Basic Flight Computer functioning", "2017-6-15"),
    new Milestone("Flight Termination verified", "2017-6-15"),
    new Milestone("Parachute Deployment verified", "2017-6-15"),
    new Milestone("Structural elements tested for flight", "2017-7-2"),
    new Milestone("Ground Support Systems ready", "2017-7-2"),
    new Milestone("Electronic Subsystems verified", "2017-7-2"),
    new Milestone("Tower is ready", "2017-8-6"),
    new Milestone("Rocket Integration", "2017-8-6", undefined, 1, -50),
    new Milestone("Rocket and Tower Integration", "2017-8-6"),
    new Milestone("Dress Rehearsals", "2017-8-13", undefined, 2, 0),
    new Milestone("Roll Out", "2017-9-12", undefined, 1, 0)
    // new Milestone("Rocket is launched", "2017-10-1"),
    // new Milestone("Past Launch Meeting", "2017-10-15")
    */



];


// Add VijMiBo
var vrijmibo_start = new Date(today.getTime());
vrijmibo_start.setDate(today.getDate() + (7 + 5 - today.getDay()) % 7);
vrijmibo_start.setHours(16);

var vrijmibo_end = new Date(vrijmibo_start.getTime());
vrijmibo_end.setHours(19);
milestones.push(new Milestone("VrijMiBo", vrijmibo_start, vrijmibo_end));

// Saturate n_show
n_show = milestones.length < n_show ? milestones.length : n_show;
