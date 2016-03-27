use strict;
use LWP::UserAgent;
use HTTP::Request::Common;
use JSON;

my $url = @ARGV[1];
my $message = 'Hello!!';
my $channel = '#random';
my $botname = 'perlbot';

my $payload = {
	"channel" => $channel,
	"username" => $botname,
	"text" => $message
};

my $request = POST($url, Content_Type => 'application/json', Content => encode_json($payload));
my $ua = LWP::UserAgent -> new;
my $res = $ua -> request($request);

# for debug;
print $res -> as_string;
