/**
 * Created by elviento on 12/16/16.
 */


// "2017-10-10 10:10:10"
var launch = new Launch("2017-10-10 10:10:10");
var start_date = new Date("2016-9-1");

var n_show = 10;
var today = new Date();

var milestones = [
    new Milestone("Small scale testing", "2016-12-12", "2016-12-21 23:59", 2, -40),
    new Milestone("Preliminary design completed", "2017-02-19 23:59", undefined, 1, 0),
    new Milestone("PR plan completed", "2017-01-15 23:59"),
    new Milestone("Detailed engine design", "2017-01-08", "2017-01-21 23:59"),
    new Milestone("First full scale test", "2017-03-19 23:59", undefined, 2, -30),
    new Milestone("CDR", "2017-04-30 23:59", undefined, 1),
    new Milestone("Design freeze", "2017-05-14 23:59", undefined, 2, 30),
    new Milestone("Hardware done", "2017-07-15 23:59", undefined, 1),
    new Milestone("Roll-out", "2017-09-12 23:59", undefined, 2)


    // new Milestone("Random", today.getTime() + 5*1000, today.getTime() + 10*1000),

    // new Milestone("Catia tutorial", "2016-12-19 22:47:00", "2016-12-19 22:47:05"),

    //
    // new Milestone('Milestone 0', new Date((new Date()).getTime() + 23*24*60*60*1000), 2),
    //
    // new Milestone('Milestone 1', new Date((new Date()).getTime() + 35*24*60*60*1000), 1, 40),


    // new Milestone('Prop PDR', '2017-1-21', undefined, 2, -50),
    // new Milestone('Prop Manufacturing', '2017-2-2', undefined, 1, 10),
    // new Milestone('Prop Testing Phase I', '2017-3-1', undefined, 2, 30),
    // new Milestone('Prop Testing Phase II', '2017-4-25', undefined, 1),
    // new Milestone('Final GO, NO GO', '2017-6-23', undefined, 2),
    // new Milestone('Final Manufacturing Begins', '2017-7-1'),
    // new Milestone('Transport', '2017-8-15', undefined, 1),
    // new Milestone('CT Team Travel to L.S ', '2017-9-19'),
    // new Milestone('Final Prep for launch', '2017-9-27'),
    // new Milestone('Launch GO, NO GO', '2017-9-30', undefined, 2),
    // new Milestone('LAUNCH DAY', '2017-10-5')
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
