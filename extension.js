var request = require('request');

var jar = request.jar();
jar.setCookie(request.cookie('viewed_welcome_page=1'), 'http://play.esea.net');

module.exports = function(nodecg) {
    nodecg.declareSyncedVar({
        variableName: 'eseaMatchID',
        initialVal: '4000164',
        setter: function(value) {
            request({
                uri: 'http://play.esea.net/index.php',
                qs: {
                    's': 'stats',
                    'd': 'match',
                    'id': value,
                    'format': 'json'
                },
                json: true,
                jar: jar
            }, function(err, http, body) {
                if (!err && http.statusCode == 200 && !body.errors && body.match.players) {
                    var stats = {};

                    stats.teams = [body.match.team_1_stats, body.match.team_2_stats];

                    stats.teams[0].period_score = {};
                    stats.teams[1].period_score = {};
                    body.match.periods.forEach(function(period) {
                        stats.teams[0].period_score[period.period] = period.team_1_score;
                        stats.teams[1].period_score[period.period] = period.team_2_score;
                    });

                    stats.teams[0].score = body.match.team_1_score;
                    stats.teams[1].score = body.match.team_2_score;

                    stats.players = body.match.players.total;

                    nodecg.variables.eseaMatchStats = stats;
                }
                else {
                    nodecg.variables.eseaMatchStats = {};
                }
            });
        }
    });

    nodecg.declareSyncedVar({
        variableName: 'eseaMatchStats',
        initialVal: {}
    });
}
