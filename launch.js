/**
 * Created by elviento on 12/17/16.
 */


function Launch(date) {
    if (date == "tbd") {
        this.date = null
    } else {
        this.date = new Date(date);
    }
    this.countdown_days = null;
    this.countdown_time = null;
}

Launch.prototype = {
    t_diff:function (other_date) {
        return this.date - other_date
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

    update:function () {
        if (this.date == null){
            $("#date_launch").html("TBD");
            $("#time_launch").html("TBD");
            $("#countdown_days").html("TBD");
            $("#countdown_time").html("TBD");
        } else if (this.date == 0) {
            return
        }else
        {
            if (this.countdown_days == null) {
                $("#date_launch").html(this.date.toDateString());
                $("#time_launch").html(this.date.toLocaleTimeString());
                this.countdown_days = $("#countdown_days");
                this.countdown_time = $("#countdown_time");
            }
            var tr = this.time_remaining();
            this.countdown_days.html(tr.days + " days");
            this.countdown_time.html(tr.hours + ":" + tr.minutes + ":" + tr.seconds);
        }

    },


};