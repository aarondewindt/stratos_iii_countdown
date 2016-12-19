/**
 * Created by elviento on 12/17/16.
 */

function Milestone(name, deadline, show_marker, marker_shift) {
    this.name = name;
    this.deadline = new Date(deadline);
    this.tr_element = null;
    this.name_element = null;
    this.deadline_element = null;
    this.countdown_element = null;

    this.next_milestone_name_element = null;
    this.next_milestone_deadline_element = null;
    this.next_milestone_countdown_element = null;

    this.show_marker = show_marker || false;
    this.marker_shift = marker_shift || 0;
    this.progress_bar = null;
    this.marker = null;
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
            this.deadline_element.html(this.deadline.format("ddd mmm d"));
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

    add_to_bar:function () {
        if (!this.show_marker) {
            return
        }

        this.progress_bar = $('#milestone_bar_1');

        this.marker = $('<div class="w3-circle w3-card-2"></div>');
        this.marker_node = $('<div class="w3-circle marker_node"></div>');
        this.marker_name = $('<div class="w3-circle marker_name"></div>');

        this.marker_name.html(this.name);
        this.marker.addClass(this.is_passed() ? "marker_past" : "marker_future");
        this.progress_bar.prepend(this.marker, this.marker_node, this.marker_name);

        var p = (this.deadline - start_date)/(launch.date - start_date);
        var pos = this.progress_bar.width() * p;
        var off = this.marker.offset();
        var top_0 = off.top;
        var left_0 = off.left;

        var name_pos = pos - this.marker_name.width() / 2 + this.marker_shift;

        name_pos = name_pos < 0 ? 0 : name_pos;
        name_pos = (name_pos + this.marker_name.width()) > this.progress_bar.width() ? (this.progress_bar.width() - this.marker_name.width()) : name_pos;

        var node_top_pos = this.show_marker == 1 ? 37.5 : 47.5;
        var name_top_pos = this.show_marker == 1 ? 0 : 50;

        this.marker.offset(     {top: top_0 + 37.5,         left: left_0 + pos - 7.5});
        this.marker_node.offset({top: top_0 + node_top_pos, left: left_0 + pos - 2.5});
        this.marker_name.offset({top: top_0 + name_top_pos, left: left_0 + name_pos });

        // left:  pos - (7.5)
        // left: pos - (2.5)
        // left: pos - (100.0)

    },

    update_bar:function () {
        if (!this.show_marker) {
            return
        }

        if (this.progress_bar == null) {
            this.add_to_bar()
        }

        var p = (this.deadline - start_date)/(launch.date - start_date);
        var pos = this.progress_bar.width() * p;
        var off = this.progress_bar.offset();
        var top_0 = off.top;
        var left_0 = off.left;

        var name_pos = pos - this.marker_name.width() / 2;

        name_pos = name_pos < 0 ? 0 : name_pos;
        name_pos = (name_pos + this.marker_name.width()) > this.progress_bar.width() ? (this.progress_bar.width() - this.marker_name.width()) : name_pos;

        var node_top_pos = this.show_marker == 1 ? 17.5 : 27.5;
        var name_top_pos = this.show_marker == 1 ? 0 : 30;

        this.marker.offset(     {top: top_0 + 17.5,         left: left_0 + pos - 7.5});
        this.marker_node.offset({top: top_0 + node_top_pos, left: left_0 + pos - 2.5});
        this.marker_name.offset({top: top_0 + name_top_pos, left: left_0 + name_pos });
    },

    update:function () {
        if (this.tr_element == null) {
            this.add_to_table()
        }

        if (this.time_remaining().days < 7 && (!this.tr_element.hasClass("warning")) && (!this.is_passed())) {
            this.tr_element.removeClass("w3-white");
            this.tr_element.removeClass("w3-theme-l4");
            this.tr_element.addClass("warning");
        }

        if (this.is_passed() && (!this.tr_element.hasClass("passed"))) {
            this.tr_element.removeClass("w3-white");
            this.tr_element.removeClass("w3-theme-l4");
            this.tr_element.removeClass("passed");
            this.tr_element.addClass("passed");
        }

        this.countdown_element.html(this.time_remaining_str())
    },

    update_next_milestone: function () {
        this.next_milestone_name_element.html(this.name);
        this.next_milestone_deadline_element.html(this.deadline.toDateString());
        this.next_milestone_countdown_element.html(this.time_remaining_str())
    }
};

