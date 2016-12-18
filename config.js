/**
 * Created by elviento on 12/16/16.
 */


// "2017-10-10 10:10:10"
var launch = new Launch("2017-10-10 10:10:10");
var start = new Date("2016-9-1");


var n_show = 5;

var milestones = [
    new Milestone('Christmas', '2016-12-25'),

    new Milestone('Milestone 0', '2017-10-13'),
    new Milestone('Milestone 1', '2017-5-5'),
    new Milestone('Milestone 2', '2017-8-17'),
    new Milestone('Milestone 3', '2017-8-7'),
    new Milestone('Milestone 4', '2017-8-8'),
    new Milestone('Milestone 5', '2017-6-23'),
    new Milestone('Milestone 6', '2017-12-1'),
    new Milestone('Milestone 7', '2017-1-7'),
    new Milestone('Milestone 8', '2017-7-14'),
    new Milestone('Milestone 9', '2017-10-5'),
    new Milestone('Milestone 10', '2017-8-9'),
    new Milestone('Milestone 11', '2017-12-23'),
    new Milestone('Milestone 12', '2017-11-13'),
    new Milestone('Milestone 13', '2017-7-11'),
    new Milestone('Milestone 14', '2017-3-4'),
    new Milestone('Milestone 15', '2017-4-17'),
    new Milestone('Milestone 16', '2017-5-3'),
    new Milestone('Milestone 17', '2017-6-28'),
    new Milestone('Milestone 18', '2017-8-20'),
    new Milestone('Milestone 19', '2017-12-16'),
    new Milestone('Milestone 20', '2017-6-28'),
    new Milestone('Milestone 21', '2017-4-13'),
    new Milestone('Milestone 22', '2017-2-21'),
    new Milestone('Milestone 23', '2017-8-11'),
    new Milestone('Milestone 24', '2017-10-5'),
    new Milestone('Milestone 25', '2017-7-12'),
    new Milestone('Milestone 26', '2017-5-21'),
    new Milestone('Milestone 27', '2017-11-21'),
    new Milestone('Milestone 28', '2017-3-25'),
    new Milestone('Milestone 29', '2017-8-18'),
    new Milestone('Milestone 30', '2017-4-12'),
    new Milestone('Milestone 31', '2017-1-24'),
    new Milestone('Milestone 32', '2017-6-2'),
    new Milestone('Milestone 33', '2017-6-17'),
    new Milestone('Milestone 34', '2017-11-10'),
    new Milestone('Milestone 35', '2017-1-9'),
    new Milestone('Milestone 36', '2017-4-21'),
    new Milestone('Milestone 37', '2017-1-10'),
    new Milestone('Milestone 38', '2017-6-12'),
    new Milestone('Milestone 39', '2017-6-22'),
    new Milestone('Milestone 40', '2017-2-24'),
    new Milestone('Milestone 41', '2017-11-19'),
    new Milestone('Milestone 42', '2017-2-26'),
    new Milestone('Milestone 43', '2017-9-10'),
    new Milestone('Milestone 44', '2017-6-17'),
    new Milestone('Milestone 45', '2017-11-12'),
    new Milestone('Milestone 46', '2017-4-3'),
    new Milestone('Milestone 47', '2017-2-16'),
    new Milestone('Milestone 48', '2017-2-10'),
    new Milestone('Milestone 49', '2017-3-20'),

    new Milestone("Milestone 50", new Date((new Date()).getTime() - 6.3*60*60*1000)),
    //
    // new Milestone("Milestone 51", new Date((new Date()).getTime() + 6.3*24*60*60*1000)),
    new Milestone("Milestone 52", new Date((new Date()).getTime() + 6.3*60*60*1000)),
];

n_show = milestones.length < n_show ? milestones.length : n_show;


