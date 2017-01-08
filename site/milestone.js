/**
 * Created by elviento on 12/17/16.
 */

function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
}

Date.prototype.is_same_date = function(pDate) {
    return (
        this.getFullYear() === pDate.getFullYear() &&
        this.getMonth() === pDate.getMonth() &&
        this.getDate() === pDate.getDate()
    );
};

function Milestone(name, deadline, remove_date, show_marker, marker_shift) {
    this.name = name;
    this.deadline = new Date(deadline);
    this.tr_element = null;
    this.name_element = null;
    this.deadline_element = null;
    this.countdown_element = null;

    // this.next_milestone_name_element = null;
    // this.next_milestone_deadline_element = null;
    // this.next_milestone_countdown_element = null;

    this.show_marker = show_marker || false;
    this.marker_shift = marker_shift || 0;
    this.progress_bar = null;
    this.marker = null;

    this.passed_msg = "Ongoing";
    this.remove_date = new Date(remove_date || this.deadline.getTime());
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

    is_passed_remove_date:function () {
        return (this.remove_date - new Date()) < 0;
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
        var tr = this.time_remaining();

        if (this.is_passed()) {
            if (this.is_passed_remove_date()) {
                return null;
            }else{
                return this.passed_msg;
            }
        }

        if (tr.days == 0) {
            return pad(tr.hours) + ":" + pad(tr.minutes) + ":" + pad(tr.seconds)
        }
        return tr.days + " Days"
    },

    add_to_table:function (i) {
        if (this.tr_element == null) {
            this.tr_element = $('<div class="w3-row" style="width:100%; flex-grow: 1;"></div>');

            this.name_element = $('<div class="w3-half w3-container milestone_name"><div/></div>').first();
            this.deadline_element = $('<div class="w3-quarter w3-container milestone_deadline"><div/></div>').first();
            this.countdown_element = $('<div class="w3-quarter w3-container milestone_countdown"><div/></div>').first();

            this.name_element.html(this.name);

            if (this.deadline.is_same_date(this.remove_date)) {
                this.deadline_element.html(this.deadline.format("ddd mmm d"));
            } else {
                this.print();
                console.log(this.remove_date);
                this.deadline_element.html(this.deadline.format("ddd mmm d") + "<br>" + this.remove_date.format("ddd mmm d"));
            }
            this.countdown_element.html(this.time_remaining_str());

            // this.tr_element.addClass((i % 2 == 0) ? "normal_l" : "normal_d");

            this.tr_element.append(this.name_element);
            this.tr_element.append(this.deadline_element);
            this.tr_element.append(this.countdown_element);

            $("#milestones_table").append(this.tr_element);

            this.next_milestone_name_element = $("#next_milestone_name");
            this.next_milestone_deadline_element = $("#next_milestone_deadline");
            this.next_milestone_countdown_element = $("#next_milestone_countdown");

        }
    },

    update:function (i) {
        if (this.tr_element == null) {
            this.add_to_table()
        }

        var level_class = "normal";

        if (this.is_passed_remove_date()) {
            remove_milestone(this)
        } else if (this.is_passed()) {
            level_class = "ongoing";
        } else if (this.time_remaining().days < 7) {
            level_class = "warning";
        }

        level_class = level_class + (i % 2 == 0 ? "_l" : "_d");

        if (!this.tr_element.hasClass(level_class)) {
            this.tr_element.removeClass("normal_l");
            this.tr_element.removeClass("ongoing_l");
            this.tr_element.removeClass("warning_l");
            this.tr_element.removeClass("normal_d");
            this.tr_element.removeClass("ongoing_d");
            this.tr_element.removeClass("warning_d");
            this.tr_element.addClass(level_class);
        }

        this.countdown_element.html(this.time_remaining_str())
    },

    // update_next_milestone: function () {
    //     this.next_milestone_name_element.html(this.name);
    //     this.next_milestone_deadline_element.html(this.deadline.toDateString());
    //     this.next_milestone_countdown_element.html(this.time_remaining_str())
    // },

// remove_from_table:function() {
    //     this.tr_element.remove();
    //     this.tr_element = null;
    // },

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

        var node_top_pos = this.show_marker == 1 ? 35 : 50;
        var name_top_pos = this.show_marker == 1 ? 0 : 52.5;

        this.marker.offset(     {top: top_0 + 37.5,         left: left_0 + pos - 7.5});
        this.marker_node.offset({top: top_0 + node_top_pos, left: left_0 + pos - 2.5});
        this.marker_name.offset({top: top_0 + name_top_pos, left: left_0 + name_pos });

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

        var name_pos = pos - this.marker_name.width() / 2 + this.marker_shift;

        name_pos = name_pos < 0 ? 0 : name_pos;
        name_pos = (name_pos + this.marker_name.width()) > this.progress_bar.width() ? (this.progress_bar.width() - this.marker_name.width()) : name_pos;

        var node_top_pos = this.show_marker == 1 ? 35 : 50;
        var name_top_pos = this.show_marker == 1 ? 0 : 52.5;

        this.marker.offset(     {top: top_0 + 37.5,         left: left_0 + pos - 7.5});
        this.marker_node.offset({top: top_0 + node_top_pos, left: left_0 + pos - 2.5});
        this.marker_name.offset({top: top_0 + name_top_pos, left: left_0 + name_pos });
    }

};
