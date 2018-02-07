<!DOCTYPE html>
<html lang="en" style="">
<head>
    <meta charset="UTF-8">
    <title>Stratos III countdown</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="theme.css">

    <script>
        function contains(arr, obj) {
            return arr.indexOf(obj) > -1;
        }

        function rem(arr, val) {
            var i = arr.indexOf(val);
            if (i > -1) {
                arr.splice(i, 1);
            }
        }


        function remove_milestone(milestone) {
            console.log("Removing console");
            rem(visible_milestones, milestone);

            milestone.tr_element.remove();
//            milestone.tr_element = null;


            for (var i = 0; visible_milestones.length < n_show; i++) {
                if (milestones[i] != undefined)
                {
                    if (milestones[i].is_passed_remove_date()) {
                        i++;
                    }else if (!contains(visible_milestones, milestones[i])) {
                        visible_milestones.push(milestones[i]);
                        milestones[i].add_to_table(i);
                    }
                } else {
                    break;
                }

            }
        }

    </script>


    <script src="jquery-3.1.1.min.js"></script>
    <script src="jcanvas.min.js"></script>
    <script src="date_format.js"></script>
    <script src="milestone.js"></script>
    <script src="launch.js"></script>
    <script src="config.js"></script>


    <?php
        $command = "python3.6 " . getcwd() . "/milestones_sheet.py";
        echo $command;
        $output = shell_exec($command);
        echo $output;
    ?>

    <script>
        var visible_milestones = [];


        $(document).ready(function(){
            // Reorder milestones so the ones with the closer deadline are on top.
            milestones.sort(function (a, b) {
                return a.t_diff(b.deadline)
            });

            // Get list of visible milestones and add them to the table.
            for (var i = 0; visible_milestones.length < n_show; i++) {
                if (milestones[i] != undefined)
                {
                    if (!milestones[i].is_passed_remove_date()) {
                        visible_milestones.push(milestones[i]);
                        milestones[i].add_to_table(i);
                    }
                } else {
                    break;
                }
            }

//            console.log(visible_milestones);


            // Cache progress bar objects.
            var progress = $('#progress');
            var progress_bar = $('#progress_bar');
            var milestones_container = $('#milestones_container');
            var milestones_table = $('#milestones_table');

            // Initialize scrolling animation.
            var scroll_speed = .02;
            var scroll_state = 0;
            var scroll_top_delay = 2000;
            var scroll_bottom_delay = 2000;
            var scroll_timer = 0;
            var dt = 100;

            // Set a callback function which will be called every 100 milliseconds.
            setInterval(function () {
                // Update milestone countdowns
                for (var i in visible_milestones) {
                    try {
                        visible_milestones[i].update(i);
                    }
                    catch(err) {
                        console.log(visible_milestones[i].name)
                    }


                }

                for (i in milestones) {
                    milestones[i].update_bar();
                }

                // Update today clock
                var today = new Date();
                $('#date_today').html(today.format("ddd mmm d yyyy"));
                $('#time_today').html(today.format("HH:MM:ss"));

                // Update launch count down
                launch.update();

                // Update progressbar
                p = (new Date() - start_date)/(launch.date - start_date);
                progress.width(progress_bar.width() * p);

                // Update scroll
                scroll_timer += dt;
                var new_scroll_pos = null;
                var milestones_max_scroll = milestones_table.height() - milestones_container.height();

                switch(scroll_state) {
                    case 0:
                        new_scroll_pos = 0;
                        if (scroll_timer > scroll_top_delay) {
                            scroll_state = 1
                            scroll_timer = 0;
                        }
                        break;
                    case 1:
                        new_scroll_pos = milestones_container.scrollTop() + scroll_speed * dt;

                        if (new_scroll_pos > milestones_max_scroll) {
                            scroll_state = 2;
                            scroll_timer = 0;
                        }
//                        new_scroll_pos = new_scroll_pos > milestones_max_scroll ? 0 : new_scroll_pos;

                        break;
                    case 2:
                        new_scroll_pos = milestones_max_scroll;
                        if (scroll_timer > scroll_bottom_delay) {
                            scroll_state = 0;
                            scroll_timer = 0;
                        }
                        break;
                    default:

                }

                milestones_container.scrollTop(new_scroll_pos);


            }, dt);

            // Auto refresh 5 seconds after VrijMiBo.
            setTimeout(function () {
                location.reload(true);
            }, vrijmibo_end.getTime() - new Date().getTime() + 5000)
        });

    </script>

</head>
<body style="">
    <header class="w3-display-container w3-theme-dark w3-card-4" style="height: 110px; position:relative; z-index: 1">
        <div class="w3-display-left" style="margin-left: 10px">
            <h1><img src="images/stratos_iii_mission_patch_1024.png" class="w3-left w3-card-16 w3-circle" style="width:80px; height:80px;">
                <span style="font-size: 58px">Stratos III countdown</span></h1>
        </div>

        <div class="w3-display-right" style="text-align: right; margin-right: 10px">
            <span id="date_today"></span><br>
            <span id="time_today"></span>
        </div>
    </header>

    <main>
        <div class="w3-row  w3-theme-d3" style="height:100%;">
            <div class="w3-rest" style="height:100%; display: flex; flex-direction: column">
                <div class="w3-row w3-theme-d3 w3-padding-8 sidebar_small w3-card-8" style="width: 100%;  position:relative; flex: none">
                    <div class="w3-half w3-container table_col_1" >Milestone</div>
                    <div class="w3-quarter w3-container table_col_2" style="text-align: center">Deadline</div>
                    <div class="w3-quarter w3-container table_col_3" style="text-align: center">Countdown</div>
                </div>

                <div id="milestones_container" style="height:100%; flex-grow: 1; overflow: auto">
                    <div id="milestones_table" style="height:auto; width: 100%; display: flex; flex-direction: column; ">
                    </div>
                </div>
            </div>

            <!--<div id="sidebar" class="w3-container w3-quarter w3-padding-64 w3-theme-d3" style="position: relative">-->
                    <!--<div class="sidebar_element">-->
                        <!--<span class="sidebar_small">Launch day</span>-->
                        <!--<div id="date_launch" class="sidebar_big"></div>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;div class="sidebar_element">-->
                        <!--<span class="sidebar_small">Launch time</span>-->
                        <!--<div id="time_launch" class="sidebar_big"></div>-->
                    <!--</div&ndash;&gt;-->

                    <!--<div class="sidebar_element">-->
                        <!--<span class="sidebar_small">Countdown</span>-->
                        <!--<div id="countdown_days" class="sidebar_big"></div>-->
                        <!--&lt;!&ndash;div id="countdown_time" class="sidebar_big"</div&ndash;&gt;-->
                    <!--</div>-->
            <!--</div>-->
        </div>

    </main>

    <footer class=" w3-theme-d5" style="width:100%; position: relative; height: 90px; padding-left: 10px; padding-right: 10px">
        <div style=" width: 100%; height: 100%">
            <div id="milestone_bar_1" style="width: 100%; height:40px; position: relative ">

            </div>

            <div id="progress_bar" style="width: 100%; height: 10px;" class="w3-theme-d4 w3-round-jumbo w3-border w3-border-theme">
                <div id="progress" style="height:100%; width: 0;" class="w3-theme-l4 w3-round-jumbo"></div>
            </div>

            <div id="milestone_bar_2" style="width: 100%; height:40px; ">
                <img src="images/rocket.png" id="rocket_icon"/>
            </div>
        </div>

    </footer>
</body>
</html>