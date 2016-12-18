/**
 * Created by elviento on 12/17/16.
 */

function Milestone(name, deadline) {
    this.name = name;
    this.deadline = new Date(deadline);
    this.tr_element = null;
    this.name_element = null;
    this.deadline_element = null;
    this.countdown_element = null;

    this.next_milestone_name_element = null;
    this.next_milestone_deadline_element = null;
    this.next_milestone_countdown_element = null;
}

Milestone.prototype = {
    print:function () {
        console.log(this.name + " : " + this.deadline + " : " + this.time_remaining_str())
    },

    t_diff:function (other_date) {
        return this.deadline - other_date
    },

    is_passed:function () {
        return this.t_diff(new Date()) < 0;
    },

    time_remaining:function () {
        var t =  this.t_diff(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    },

    time_remaining_str:function () {
        tr = this.time_remaining();

        if (this.is_passed()) {
            return "Passed"
        }

        if (tr.days == 0) {
            return tr.hours + ":" + tr.minutes + ":" + tr.seconds
        }
        return tr.days + " Days "
    },

    add_to_table:function (i) {
        if (this.tr_element == null) {
            this.tr_element = $('<div class="w3-row" style="width:100%; flex-grow: 1;"></div>');



            this.name_element = $('<div class="w3-half w3-container milestone_name"><div/></div>').first();
            this.deadline_element = $('<div class="w3-quarter w3-container milestone_deadline"><div/></div>').first();
            this.countdown_element = $('<div class="w3-quarter w3-container milestone_countdown"><div/></div>').first();

            this.name_element.html(this.name);
            this.deadline_element.html(this.deadline.toDateString());
            this.countdown_element.html(this.time_remaining_str());

            var line_class = (i % 2 == 0) ? "w3-white" : "w3-theme-l4";
            this.tr_element.addClass(line_class);

            this.tr_element.append(this.name_element);
            this.tr_element.append(this.deadline_element);
            this.tr_element.append(this.countdown_element);

            $("#milestones_table").append(this.tr_element);

            this.next_milestone_name_element = $("#next_milestone_name");
            this.next_milestone_deadline_element = $("#next_milestone_deadline");
            this.next_milestone_countdown_element = $("#next_milestone_countdown");


        }
    },

    update:function () {
        if (this.tr_element == null) {
            this.add_to_table()
        }

        if (this.time_remaining().days < 7 && (!this.tr_element.hasClass("warning_red")) && (!this.is_passed())) {
            this.tr_element.removeClass("w3-white");
            this.tr_element.removeClass("w3-theme-l4");
            this.tr_element.addClass("warning_red");
        }

        if (this.is_passed() && (!this.tr_element.hasClass("w3-red"))) {
            this.tr_element.removeClass("w3-white");
            this.tr_element.removeClass("w3-theme-l4");
            this.tr_element.removeClass("w3-pale-red");
            this.tr_element.addClass("w3-red");
        }

        this.countdown_element.html(this.time_remaining_str())
    },

    update_next_milestone: function () {
        console.log("qwertuiop");
        this.next_milestone_name_element.html(this.name);
        this.next_milestone_deadline_element.html(this.deadline.toDateString());
        this.next_milestone_countdown_element.html(this.time_remaining_str())
    }
};

