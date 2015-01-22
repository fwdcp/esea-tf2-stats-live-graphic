nodecg.declareSyncedVar({
    variableName: 'eseaMatchID',
    initialVal: '',
    setter: function(value) {
        $('#esea-match-id').val(value);
    }
});

nodecg.declareSyncedVar({
    variableName: 'eseaMatchStats',
    initialVal: {},
    setter: function(value) {
        $('#esea-match-teams > tbody').empty();

        if (value.teams) {
            _.each(value.teams, function(team) {
                $('#esea-match-teams > tbody').append("<tr></tr>");

                if (team.team_index == 1) {
                    $('#esea-match-teams > tbody > tr:last-child').addClass('odd');
                }
                else {
                    $('#esea-match-teams > tbody > tr:last-child').addClass('even');
                }

                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.team_name + "</td>");

                if (team.period_score[1]) {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"half1\">" + team.period_score[1] + "</td>");
                    $('#esea-match-teams .half1').show();
                }
                else {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"half1\">-</td>");
                    $('#esea-match-teams .half1').hide();
                }

                if (team.period_score[2]) {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"half2\">" + team.period_score[2] + "</td>");
                    $('#esea-match-teams .half2').show();
                }
                else {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"half2\">-</td>");
                    $('#esea-match-teams .half2').hide();
                }

                if (team.period_score[3]) {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"overtime\">" + team.period_score[3] + "</td>");
                    $('#esea-match-teams .overtime').show();
                }
                else {
                    $('#esea-match-teams > tbody > tr:last-child').append("<td class=\"overtime\">-</td>");
                    $('#esea-match-teams .overtime').hide();
                }

                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.score + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.frags + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.damage_dealt + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.health_received + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.capture_point_captures + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.capture_point_blocks + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.ubercharges + "</td>");
                $('#esea-match-teams > tbody > tr:last-child').append("<td>" + team.ubercharges_dropped + "</td>");
            });
        }

        $('#esea-match-players > tbody').empty();

        if (value.players) {
            _.each(value.players, function(player) {
                $('#esea-match-players > tbody').append("<tr></tr>");

                if (player.team_index == 1) {
                    $('#esea-match-players > tbody > tr:last-child').addClass('odd');
                }
                else {
                    $('#esea-match-players > tbody > tr:last-child').addClass('even');
                }

                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.country_flag + " " + player.alias + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.frags + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.assists + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.deaths + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + ((player.frags + player.assists) / player.deaths).toFixed(2) + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.damage_dealt + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.ddm.toFixed(2) + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.health_received + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.medic_picks + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.capture_point_captures + "</td>");
                $('#esea-match-players > tbody > tr:last-child').append("<td>" + player.capture_point_blocks + "</td>");
            });
        }

        $("#esea-match-players").trigger("update");
    }
});

nodecg.declareSyncedVar({
    variableName: 'eseaMatchPlayersSorts',
    initialVal: [[0,0]],
    setter: function(value) {
        if (!_.isEqual(value, $("#esea-match-players")[0].config.sortList)) {
            $("#esea-match-players").trigger("sorton", [value]);
        }
    }
});

$('#esea-match-id-update').click(function() {
    nodecg.variables.eseaMatchID = $('#esea-match-id').val();
});

$("#esea-match-players").tablesorter({
    sortList: [[0,0]]
})

$("#esea-match-players").on("sortEnd", function(sorter) {
    if (!_.isEqual(nodecg.variables.eseaMatchPlayersSorts, sorter.target.config.sortList)) {
        nodecg.variables.eseaMatchPlayersSorts = sorter.target.config.sortList;
    }
});
