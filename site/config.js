/**
 * Created by elviento on 12/16/16.
 */


// "2017-10-10 10:10:10"
var launch = new Launch("2017-10-10 10:10:10");
var start_date = new Date("2016-9-1");


var n_show = 10;

var milestones = [
    new Milestone("Small scale testing", "2016-12-12", 1, -80),
    new Milestone("Random", new Date((new Date()).getTime() + 23*60*60*1000)),
    //
    // new Milestone('Milestone 0', new Date((new Date()).getTime() + 23*24*60*60*1000), 2),
    //
    // new Milestone('Milestone 1', new Date((new Date()).getTime() + 35*24*60*60*1000), 1, 40),


    new Milestone('Prop PDR', '2017-1-21', 2, -40),
    new Milestone('Prop Manufacturing', '2017-2-2', 1, 10),
    new Milestone('Prop Testing Phase I', '2017-3-1', 2, 30),
    new Milestone('Prop Testing Phase II', '2017-4-25', 1),
    new Milestone('Final GO, NO GO', '2017-6-23', 2),
    new Milestone('Final Manufacturing Begins', '2017-7-1'),
    new Milestone('Transport', '2017-8-15', 1),
    new Milestone('CT Team Travel to L.S ', '2017-9-19'),
    new Milestone('Final Prep for launch', '2017-9-27'),
    new Milestone('Launch GO, NO GO', '2017-9-30', 2),
    new Milestone('LAUNCH DAY', '2017-10-5'),
];


n_show = milestones.length < n_show ? milestones.length : n_show;


