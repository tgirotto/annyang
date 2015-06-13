var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var annyang = require('annyang');

var SERVER_PORT = 3000;

var app = express();

app.use(logger('dev'));
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false}));
app.use( require('cookie-parser')() );
app.use(bodyParser.json());
app.use(cookieParser());
app.set('port', (process.env.PORT || SERVER_PORT));
app.use(express.static(__dirname + '/public'));

/*******************************************************************************/

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.post('/evaluate', function(req, res) {
	console.log("the content of the request is: ", req.body);

	var output = compute_result(req.body.out);
	console.log(output);

	res.json({"hello" : output});
});

//1. ENFJ
var fullDescription1 = '(Extraverted Intuitive Feeling Judging)';
var traits1 = 'Genuinely and warmly interested in people' + '\n' +
	"Value people's feelings" + '\n' +
	'Value structure and organization' + '\n' +
	'Value harmony, and good at creating it' + '\n' +
	'Exceptionally good people skills' + '\n' +
	'Dislike impersonal logic and analysis' + '\n' +
	'Strong organizational capabilities' + '\n' +
	'Loyal and honest' + '\n' +
	'Creative and imaginative' + '\n' +
	'Enjoy variety and new challenges' + '\n' +
	'Get personal satisfaction from helping others' + '\n' +
	'Extremely sensitive to criticism and discord' + '\n' +
	'Need approval from others to feel good about themselves' + '\n';
var strengths1 = 'ENFJ Strengths:' + '\n' +
	'Good verbal communication skills' + '\n' +
	"Very perceptive about people's thoughts and motives" + '\n' +
	'Motivational, inspirational; bring out the best in others' + '\n' +
	'Warmly affectionate and affirming' + '\n' +
	'Fun to be with - lively sense of humor, dramatic, energetic, optimistic' + '\n' +
	'Good money skills' + '\n' +
	'Able to "move on" after a love relationship has failed (although they blame themselves)' + '\n' +
	'Loyal and committed - they want lifelong relationships' + '\n' +
	'Strive for "win-win" situations' + '\n' +
	"Driven to meet other's needs" + '\n';
var weaknesses1 = 'ENFJ Weaknesses:' + '\n' +
	'Tendency to be smothering and over-protective' + '\n' +
	"Tendency to be controlling and/or manipulative" + '\n' +
	"Don't pay enough attention to their own needs" + '\n' +
	"Tend to be critical of opinions and attitudes which don't match their own" + '\n' +
	'Sometimes unaware of social appropriateness or protocol' + '\n' +
	'Extremely sensitive to conflict, with a tendency to sweep things under the rug as an avoidance tactic' + '\n' +
	'Tendency to blame themselves when things go wrong, and not give themselves credit when things go right' + '\n' +
	'Their sharply defined value systems make them unbending in some areas' + '\n' +
	'They may be so attuned to what is socially accepted or expected that they are unable to assess whether something is right or wrong outside of what their social circle expects.' + '\n';
//2. ENTJ
var fullDescription2 = '(Extraverted Intuitive Thinking Judging)';
var traits2 = 'Driven to turn theories into plans' + '\n' +
	'Highly value knowledge' + '\n' +
	'Future-oriented' + '\n' +
	'Natural leaders' + '\n' +
	'Impatient with inefficiency and incompetence' + '\n' +
	'Want things structured and orderly' + '\n' +
	'Excellent verbal communication skills' + '\n' +
	'Dislike routine, detail-oriented tasks' + '\n' +
	'Self-confident' + '\n' +
	'Decisive' + '\n';
var strengths2 = 'ENTJ Strengths:' + '\n' +
	"Genuinely interested in people's ideas and thoughts" + '\n' +
	'Enthusiastic and energetic' + '\n' +
	'Take their commitments very seriously' + '\n' +
	'Fair-minded and interested in doing the Right Thing' + '\n' +
	'Very good with money' + '\n' +
	'Extremely direct and straightforward' + '\n' +
	'Verbally fluent' + '\n' +
	'Enhance and encourage knowledge and self-growth in all aspects of life' + '\n' +
	'Able to leave relationships without looking back' + '\n' +
	'Able to turn conflict situations into positive lessons' + '\n' +
	'Able to take constructive criticism well' + '\n' +
	'Extremely high standards and expectations (both a strength and a weakness)' + '\n' +
	'Usually have strong affections and sentimental streaks' + '\n' +
	'Able to dole out discipline' + '\n';
var weaknesses2 = 'ENTJ Weaknesses:' + '\n' +
	'Their enthusiasm for verbal debates can make them appear argumentative' + '\n' +
	'Tendency to be challenging and confrontational' + '\n' +
	'Tend to get involved in "win-lose" conversations' + '\n' +
	'Tendency to have difficulty listening to others' + '\n' +
	"Tendency to be critical of opinions and attitudes which don't match their own" + '\n' +
	'Extremely high standards and expectations (both a strength and a weakness)' + '\n' +
	"Not naturally in tune with people's feelings and reactions" + '\n' +
	'May have difficulty expressing love and affection, sometimes seeming awkward or inappropriate' + '\n' +
	'Can be overpowering and intimidating to others' + '\n' +
	'Tendency to want to always be in charge, rather than sharing responsibilities' + '\n' +
	'Can be very harsh and intolerant about messiness or inefficiency' + '\n' +
	'Tendency to be controlling' + '\n' +
	"May be slow to give praise or to realize another's need for praise" + '\n' +
	'If unhappy or underdeveloped, they may be very impersonal, dictatorial, or abrasive' + '\n' +
	'Tendency to make hasty decisions' + '\n' +
	'Make explode with terrible tempers when under extreme stress' + '\n';
//3. ENFP
var fullDescription3 = '(Extraverted Intuitive Feeling Perceiving)';
var traits3 = 'Project-oriented' + '\n' +
	'Bright and capable' + '\n' +
	'Warmly, genuinely interested in people; great people skills' + '\n' +
	'Extremely Intuitive and perceptive about people' + '\n' +
	'Able to relate to people on their own level' + '\n' +
	'Service-oriented; likely to put the needs of others above their own' + '\n' +
	'Future-oriented' + '\n' +
	'Dislike performing routine tasks' + '\n' +
	'Need approval and appreciation from others' + '\n' +
	'Cooperative and friendly' + '\n' +
	'Creative and energetic' + '\n' +
	'Well-developed verbal and written communication skills' + '\n' +
	"Natural leaders, but do not like to control people" + '\n' +
	'Resist being controlled by others' + '\n' +
	'Can work logically and rationally - use their intuition to understand the goal and work backwards towards it' + '\n' +
	'Usually able to grasp difficult concepts and theories' + '\n';
var strengths3 = 'ENFP Strengths:' + '\n' +
	'Good communication skills' + '\n' +
	"Very perceptive about people's thought and motives" + '\n' +
	'Motivational, inspirational; bring out the best in others' + '\n' +
	'Warmly affectionate and affirming' + '\n' +
	"Fun to be with - lively sense of humor, dramatic, energetic, optimistic" + '\n' +
	'Strive for "win-win" situations' + '\n' +
	"Driven to meet other's needs" + '\n' +
	'Usually loyal and dedicated' + '\n';
var weaknesses3 = 'ENFP Weaknesses:' + '\n' +
	'Tendency to be smothering' + '\n' +
	'Their enthusiasm may lead them to be unrealistic' + '\n' +
	'Uninterested in dealing with "mundane" matters such as cleaning, paying bills, etc.' + '\n' +
	"Hold onto bad relationships long after they've turned bad" + '\n' +
	"Extreme dislike of conflict" + '\n' +
	'Extreme dislike of criticism' + '\n' +
	"Don't pay attention to their own needs" + '\n' +
	'Constant quest for the perfect relationship may make them change relationships frequently' + '\n' +
	'May become bored easily' + '\n' +
	'Have difficulty scolding or punishing others' + '\n';
//4. ENTP
var fullDescription4 = '(Extraverted Intuitive Thinking Perceiving)';
var traits4 = 'Project-oriented' + '\n' +
	'Enjoy generating ideas and theories' + '\n' +
	'Creative and ingenious' + '\n' +
	'Bright and capable' + '\n' +
	'Flexible and Diverse' + '\n' +
	"Excellent communication skills" + '\n' +
	'Enjoy debating issues with other people' + '\n' +
	"Excellent people skills" + '\n' +
	'Natural leaders, but do not like to control people' + '\n' +
	'Resist being controlled by people' + '\n' +
	'Lively and energetic; able to motivate others' + '\n' +
	'Highly value knowledge and competence' + '\n' +
	'Logical, rational thinkers' + '\n' +
	"Able to grasp difficult concepts and theories" + '\n' +
	'Enjoy solving difficult problems' + '\n' +
	'Dislike confining schedules and environments' + '\n' +
	'Dislike routine, detailed tasks' + '\n';
var strengths4 = 'ENTP strengths:' + '\n' +
	'Enthusiastic, upbeat, and popular' + '\n' +
	'Can be very charming' + '\n' +
	'Excellent communication skills' + '\n' +
	'Extremely interested in self-improvement and growth in their relationships' + '\n' +
	"Laid-back and flexible, usually easy to get along with" + '\n' +
	'Big idea-people, always working on a grand scheme or idea' + '\n' +
	"Usually good at making money, although not so good at managing it" + '\n' +
	'Take their commitments and relationships very seriously' + '\n' +
	'Able to move on with their lives after leaving a relationship' + '\n';
var weaknesses4 = 'ENTP Weaknesses:' + '\n' +
	'Always excited by anything new, they may change partners frequently' + '\n' +
	'Tendency to not follow through on their plans and ideas' + '\n' +
	'Their love of debate may cause them to provoke arguments' + '\n' +
	'Big risk-takers and big spenders, not usually good at managing money' + '\n' +
	"Although they take their commitments" + '\n';
//5. ESFJ
var fullDescription5 = '(Extraverted Sensing Feeling Judging)';
var traits5 = 'Organized' + '\n' +
	'Loyal' + '\n' +
	'Can be depended on to follow things through to completion' + '\n' +
	'Enjoy creating order, structure and schedules' + '\n' +
	'Enjoy interacting with people' + '\n' +
	"Warm-hearted and sympathetic" + '\n' +
	"Tend to put others' needs above their own" + '\n' +
	"Very good at giving practical care" + '\n' +
	'Very cooperative, good team members' + '\n' +
	'Practical and down-to-earth' + '\n' +
	'Value peaceful living and security' + '\n' +
	'Enjoy variety, but work well with routine tasks' + '\n' +
	'Need approval from others' + '\n' +
	"Receive satisfaction from giving to others" + '\n' +
	'Live in the here and now - dislike theorizing about the future' + '\n';
var strengths5 = 'ESFJ Strengths:' + '\n' +
	'Put forth a lot of effort to fulfill their duties and obligations' + '\n' +
	'Warm, friendly and affirming by nature' + '\n' +
	'Service-oriented, they want to please others' + '\n' +
	'Take their commitments very seriously, and seek lifelong relationships' + '\n' +
	"Responsible and practical, they can be counted to take care of day-to-day necessities" + '\n' +
	'Generally upbeat and popular, people are drawn towards them' + '\n' +
	"Generally very good money managers" + '\n' +
	'Traditionally minded and family-oriented, they will make family celebrations and traditions special events';
var weaknesses5 = 'ESFJ Weaknesses:' + '\n' +
	'Generally uncomfortable with change, and moving into new territories' + '\n' +
	'Extreme dislike of conflict and criticism' + '\n' +
	'Need a lot of positive affirmation to feel good about themselves' + '\n' +
	'May be overly status-conscious, and interested in how others see them' + '\n' +
	'Have very difficult time accepting the end of a relationship, and are likely to take the blame for the failure onto their own shoulders' + '\n' +
	'Have difficulty accepting negative things about people close to them' + '\n' +
	"Don't pay enough attention to their own needs, and may be self-sacrificing" + '\n' +
	'May tend to use guilt manipulation as a way to get what they want' + '\n';
//6. ESFP
var fullDescription6 = '(Extraverted Sensing Feeling Perceiving)';
var traits6 = 'Live in the present moment' + '\n' +
	'Are stimulated and excited by new experiences' + '\n' +
	'Practical and realistic' + '\n' +
	'Warmly interested in people' + '\n' +
	'Know how to have a good time, and how to make things fun for others' + '\n' +
	'Independent and resourceful' + '\n' +
	'Spontaneous - seldom plan ahead' + '\n' +
	'Hate structure and routine' + '\n' +
	'Dislike theory and long written explanations' + '\n' +
	'Feel special bond with children and animals' + '\n' +
	'Strongly developed aesthetic appreciation for things' + '\n' +
	'Great people skills' + '\n';
var strengths6 = 'ESFP Strengths:' + '\n' +
	'Enthusiastic and fun-loving, they make everything enjoyable' + '\n' +
	'Clever, witty, direct, and popular, people are drawn towards them' + '\n' +
	'Earthy and sensual' + '\n' +
	'Down to earth and practical, able to take care of daily needs' + '\n' +
	"Artistic and creative, they're likely to have attractive homes" + '\n' +
	'Flexible and diverse, they "go with the flow" extremely well' + '\n' +
	"They can leave bad relationships, although it's not easy" + '\n' +
	'Try to make the most of every moment' + '\n' +
	'Generous and warm-hearted' + '\n';
var weaknesses6 = 'ESFP Weaknesses:' + '\n' +
	'May be frivolous and risky with money' + '\n' +
	'Tend to be materialistic' + '\n' +
	'Extreme dislike of criticism, likely to take things extremely personally' + '\n' +
	'Likely to ignore or escape conflict situations rather than face them' + '\n' +
	'Lifelong commitments may be a struggle for them - they take things one day at a time' + '\n' +
	"Don't pay enough attention to their own needs" + '\n' +
	'Tendency to neglect their health, or even abuse their bodies' + '\n' +
	'Always excited by something new, they may change partners frequently' + '\n';
//7. ESTJ
var fullDescription7 = '(Extraverted Sensing Thinking Judging)';
var traits7 = 'Natural leaders - they like to be in charge' + '\n' +
	'Value security and tradition' + '\n' +
	'Loyal' + '\n' +
	'Hard-working and dependable' + '\n' +
	'Athletic and wholesome' + '\n' +
	'Have a clear set of standards and beliefs which they live by' + '\n' +
	'No patience with incompetence or inefficiency' + '\n' +
	'Excellent organizational abilities' + '\n' +
	'Enjoy creating order and structure' + '\n' +
	'Very thorough' + '\n' +
	'Will follow projects through to completion' + '\n' +
	'Straight-forward and honest' + '\n' +
	'Driven to fulfill their duties' + '\n';
var strengths7 = 'ESTJ Strengths:' + '\n' +
	'Generally enthusiastic, upbeat and friendly' + '\n' +
	'Stable and dependable, they can be counted on to promote security for their families' + '\n' +
	'Put forth a lot of effort to fulfill their duties and obligations' + '\n' +
	'Responsible about taking care of day-to-day practical concerns around the house' + '\n' +
	'Usually good (albeit conservative) with money' + '\n' +
	'Not personally threatened by conflict or criticism' + '\n' +
	'Interested in resolving conflict, rather than ignoring it' + '\n' +
	'Take their commitments very seriously, and seek lifelong relationships' + '\n' +
	'Able to move on after a relationship breaks up' + '\n' +
	'Able to administer discipline when necessary;' + '\n';
var weaknesses7 = 'ESTJ Weaknesses:' + '\n' +
	'Tendency to believe that they are always right' + '\n' +
	'Tendency to need to always be in charge' + '\n' +
	'Impatient with inefficiency and sloppiness' + '\n' +
	'Not naturally in tune with what others are feeling' + '\n' +
	'Not naturally good at expressing their feelings and emotions' + '\n' +
	'May inadvertently hurt others with insensitive language' + '\n' +
	'Tendency to be materialistic and status-conscious' + '\n' +
	'Generally uncomfortable with change, and moving into new territories' + '\n';
//8. ESTP
var fullDescription8 = '(Extraverted Sensing Thinking Perceiving)';
var traits8 = 'Action-oriented' + '\n' +
	'Live in the present moment' + '\n' +
	'Dislike abstract theory without practical application' + '\n' +
	'Like to see immediate results for their efforts' + '\n' +
	'Fast-paced and energetic' + '\n' +
	'Flexible and adaptable' + '\n' +
	'Resourceful' + '\n' +
	'Seldom work from a plan - make things up as they go' + '\n' +
	'Fun to be around' + '\n' +
	'Highly observant' + '\n' +
	'Excellent memory for details' + '\n' +
	'Excellent people skills' + '\n' +
	'Good-natured' + '\n' +
	'Excellent ability to see an immediate problem and quickly devise a solution' + '\n' +
	'Attracted to adventure and risk' + '\n' +
	'May be flashy or showy' + '\n' +
	'Like initiating things - not necessarily following them through to completion' + '\n';
var strengths8 = 'ESTP Strengths:' + '\n' +
	'Can be quite charming' + '\n' +
	'Witty, clever, and popular' + '\n' +
	'Earthy and sensual' + '\n' +
	'Not personally threatened by conflict or criticism' + '\n' +
	'Excellent and clear-headed dealing with emergency situations' + '\n' +
	'Enthusiastic and fun-loving, they try to make everything enjoyable' + '\n' +
	'As "big kids" themselves, they are eager, willing and able to spend time with their kids' + '\n' +
	'Likely to enjoy lavishing their loved ones with big gifts (both a strength and a weakness)' + '\n';
var weaknesses8 = 'ESTP Weaknesses:' + '\n' +
	'Not naturally in tune with what others are feeling' + '\n' +
	'Not naturally good at expressing feelings and emotions' + '\n' +
	'May inadvertently hurt others with insensitive language' + '\n' +
	'May be very good with money, but highly risky with it as well' + '\n' +
	"Living in the present, they're not usually good long-range planners" + '\n' +
	'May fall into the habit of ignoring conflict, rather than solving it' + '\n' +
	"Don't naturally make lifelong commitments - they take things one day at a time" + '\n' +
	'Prone to get bored easily' + '\n' +
	'More likely than other type to leave relationships quickly when they get bored' + '\n' +
	'Likely to enjoy lavishing their loved ones with big gifts (both a strength and a weakness)' + '\n';
//9. INFJ
var fullDescription9 = '(Introverted Intuitive Feeling Judging)';
var traits9 = 'Intuitively understand people and situations' + '\n' +
	'Idealistic' + '\n' +
	'Highly principled' + '\n' +
	'Complex and deep' + '\n' +
	'Natural leaders' + '\n' +
	'Sensitive and compassionate towards people' + '\n' +
	'Service-oriented' + '\n' +
	'Future-oriented' + '\n' +
	'Value deep, authentic relationships' + '\n' +
	'Reserved about expressing their true selves' + '\n' +
	'Dislike dealing with details unless they enhance or promote their vision' + '\n' +
	'Constantly seeking meaning and purpose in everything' + '\n' +
	'Creative and visionary' + '\n' +
	'Intense and tightly-wound' + '\n' +
	'Can work logically and rationally - use their intuition to understand the goal and work backwards towards it' + '\n';
var strengths9 = 'INFJ Strengths:' + '\n' +
	'Warm and affirming by nature' + '\n' +
	'Dedicated to achieving the ultimate relationship' + '\n' +
	"Sensitive and concerned for others' feelings" + '\n' +
	'Usually have good communication skills, especially written' + '\n' +
	'Take their commitments very seriously, and seek lifelong relationships' + '\n' +
	'Have very high expectations for themselves and others (both a strength and weakness)' + '\n' +
	'Good listeners' + '\n' +
	'Are able to move on after a relationship has ended (once they are sure it is over)' + '\n';
var weaknesses9 = 'INFJ Weaknesses:' + '\n' +
	'Tendency to hold back part of themselves' + '\n' +
	'Not good with money or practical day-to-day life necessities' + '\n' +
	'Extreme dislike of conflict and criticism' + '\n' +
	'Have very high expectations for themselves and others (both a strength and weakness)' + '\n' +
	'Have difficulty leaving a bad relationship' + '\n';
//10. INFP
var fullDescription10 = '(Introverted Intuitive Feeling Perceiving)';
var traits10 = 'Strong value systems' + '\n' +
	'Warmly interested in people' + '\n' +
	'Service-oriented, usually putting the needs of others above their own' + '\n' +
	'Loyal and devoted to people and causes' + '\n' +
	'Future-oriented' + '\n' +
	'Growth-oriented; always want to be growing in a positive direction' + '\n' +
	'Creative and inspirational' + '\n' +
	'Flexible and laid-back, unless a ruling principle is violated' + '\n' +
	'Sensitive and complex' + '\n' +
	'Dislike dealing with details and routine work' + '\n' +
	'Original and individualistic - "out of the mainstream"' + '\n' +
	'Excellent written communication skills' + '\n' +
	'Prefer to work alone, and may have problems working on teams' + '\n' +
	'Value deep and authentic relationships' + '\n' +
	'Want to be seen and appreciated for who they are' + '\n';
var strengths10 = 'INFP Strengths:' + '\n' +
	'Warmly concerned and caring towards others' + '\n' +
	'Sensitive and perceptive about what others are feeling' + '\n' +
	'Loyal and committed - they want lifelong relationships' + '\n' +
	'Deep capacity for love and caring' + '\n' +
	"Driven to meet other's needs" + '\n' +
	'Strive for "win-win" situations' + '\n' +
	'Nurturing, supportive and encouraging' + '\n' +
	"Likely to recognize and appreciate other's need for space" + '\n' +
	'Able to express themselves well' + '\n' +
	'Flexible and diverse' + '\n';
var weaknesses10 = 'INFP Weaknesses:' + '\n' +
	'May tend to be shy and reserved' + '\n' +
	"Don't like to have their space invaded" + '\n' +
	'Extreme dislike of conflict' + '\n' +
	'Extreme dislike of criticism' + '\n' +
	'Strong need to receive praise and positive affirmation' + '\n' +
	'May react very emotionally to stressful situations' + '\n' +
	'Have difficulty leaving a bad relationship' + '\n' +
	'Have difficulty scolding or punishing others' + '\n' +
	'Tend to be reserved about expressing their feelings' + '\n' +
	'Perfectionist tendencies may cause them to not give themselves enough credit' + '\n' +
	'Tendency to blame themselves for problems, and hold everything on their own shoulders' + '\n';
//11. INTJ
var fullDescription11 = '(Introverted Intuitive Thinking Judging)';
var traits11 = 'Able to absorb extremely complex theoretical and complex material' + '\n' +
	'Driven to create order and structure from theoretical abstractions' + '\n' +
	'Supreme strategists' + '\n' +
	'Future-oriented' + '\n' +
	'See the global, "big picture"' + '\n' +
	'Strong insights and intuitions, which they trust implicitly' + '\n' +
	'Value their own opinions over others' + '\n' +
	'Love difficult theoretical challenges' + '\n' +
	'Bored when dealing with mundane routine' + '\n' +
	'Value knowledge and efficiency' + '\n' +
	'Have no patience with inefficiency and confusion' + '\n' +
	'Have very high standards for performance, which they apply to themselves most strongly' + '\n' +
	'Reserved and detached from others' + '\n' +
	'Calm, collected and analytical' + '\n' +
	'Extremely logical and rational' + '\n' +
	'Original and independent' + '\n' +
	'Natural leaders, but will follow those they can fully support' + '\n' +
	'Creative, ingenious, innovative, and resourceful' + '\n' +
	'Work best alone, and prefer to work alone' + '\n';
var strengths11 = 'INTJ Strengths:' + '\n' +
	'Not threatened by conflict or criticism' + '\n' +
	'Usually self-confident' + '\n' +
	'Take their relationships and commitments seriously' + '\n' +
	'Generally extremely intelligent and capable' + '\n' +
	'Able to leave a relationship which should be ended, although they may dwell on it in their minds for awhile afterwards' + '\n' +
	'Interested in "optimizing" their relationships' + '\n' +
	'Good listeners' + '\n';
var weaknesses11 = 'INTJ Weaknesses:' + '\n' +
	'Not naturally in tune with others feelings; may be insensitive at times' + '\n' +
	'May tend to respond to conflict with logic and reason, rather than the desired emotional support' + '\n' +
	'Not naturally good at expressing feelings and affections' + '\n' +
	"Tendency to believe that they're always right" + '\n' +
	'Tendency to be unwilling or unable to accept blame' + '\n' +
	'Their constant quest to improve everything may be taxing on relationships' + '\n' +
	'Tend to hold back part of themselves' + '\n';
//12. INTP
var fullDescription12 = '(Introverted Intuitive Thinking Perceiving)';
var traits12 = 'Love theory and abstract ideas' + '\n' +
	'Truth Seekers - they want to understand things by analyzing underlying principles and structures' + '\n' +
	'Value knowledge and competence above all else' + '\n' +
	'Have very high standards for performance, which they apply to themselves' + '\n' +
	'Independent and original, possibly eccentric' + '\n' +
	'Work best alone, and value autonomy' + '\n' +
	'Have no desire to lead or follow' + '\n' +
	'Dislike mundane detail' + '\n' +
	'Not particularly interested in the practical application of their work' + '\n' +
	'Creative and insightful' + '\n' +
	'Future-oriented' + '\n' +
	'Usually brilliant and ingenious' + '\n' +
	'Trust their own insights and opinions above others' + '\n' +
	'Live primarily inside their own minds, and may appear to be detached and uninvolved with other people' + '\n';
var strengths12 = 'INTP Strengths:' + '\n' +
	'They feel love and affection for those close to them which is almost childlike in its purity' + '\n' +
	'Generally laid-back and easy-going, willing to defer to their mates' + '\n' +
	'Approach things which interest them very enthusiastically' + '\n' +
	'Richly imaginative and creative' + '\n' +
	'Do not feel personally threatened by conflict or criticism' + '\n' +
	'Usually are not demanding, with simple daily needs' + '\n';
var weaknesses12 = 'INTP Weaknesses:' + '\n' +
	"Not naturally in tune with others' feelings; slow to respond to emotional needs" + '\n' +
	'Not naturally good at expressing their own feelings and emotions' + '\n' +
	'Tend to be suspicious and distrusting of others' + '\n' +
	'Not usually good at practical matters, such as money management, unless their work involves these concerns' + '\n' +
	'They have difficulty leaving bad relationships' + '\n' +
	'Tend to "blow off" conflict situations by ignoring them, or else they "blow up" in heated anger' + '\n';
//13. ISFJ
var fullDescription13 = '(Introverted Sensing Feeling Judging)';
var traits13 = 'Large, rich inner store of information which they gather about people' + '\n' +
	"Highly observant and aware of people's feelings and reactions" + '\n' +
	'Excellent memory for details which are important to them' + '\n' +
	'Very in-tune with their surroundings - excellent sense of space and function' + '\n' +
	'Can be depended on to follow things through to completion' + '\n' +
	'Will work long and hard to see that jobs get done' + '\n' +
	'Stable, practical, down-to-earth - they dislike working with theory and abstract thought' + '\n' +
	"Dislike doing things which don't make sense to them" + '\n' +
	'Value security, tradition, and peaceful living' + '\n' +
	'Service-oriented: focused on what people need and want' + '\n' +
	'Kind and considerate' + '\n' +
	"Likely to put others' needs above their own" + '\n' +
	'Learn best with hands-on training' + '\n' +
	'Enjoy creating structure and order' + '\n' +
	'Take their responsibilities seriously' + '\n' +
	'Extremely uncomfortable with conflict and confrontation' + '\n';
var strengths13 = 'ISFJ Strengths:' + '\n' +
	'Warm, friendly and affirming by nature' + '\n' +
	'Service-oriented, wanting to please others' + '\n' +
	'Good listeners' + '\n' +
	'Will put forth lots of effort to fulfill their duties and obligations' + '\n' +
	'Excellent organizational capabilities' + '\n' +
	'Good at taking care of practical matters and daily needs' + '\n' +
	'Usually good (albeit conservative) at handling money' + '\n' +
	'Take their commitments seriously, and seek lifelong relationships' + '\n';
var weaknesses13 = 'ISFJ Weaknesses:' + '\n' +
	"Don't pay enough attention to their own needs" + '\n' +
	'May have difficulty branching out into new territory' + '\n' +
	'Extreme dislike of conflict and criticism' + '\n' +
	'Unlikely to express their needs, which may cause pent-up frustrations to build inside' + '\n' +
	'Have difficulty leaving a bad relationship' + '\n' +
	'Have difficulty moving on after the end of a relationship' + '\n';
//14. ISFP
var fullDescription14 = '(Introverted Sensing Feeling Perceiving)';
var traits14 = 'Keen awareness of their environment' + '\n' +
	'Live in the present moment' + '\n' +
	'Enjoy a slower pace - they like to take time to savor the present moment' + '\n' +
	'Dislike dealing with theory or abstract thought, unless they see a practical application' + '\n' +
	'Faithful and loyal to people and ideas which are important to them' + '\n' +
	'Individualistic, having no desire to lead or follow' + '\n' +
	'Take things seriously, although they frequently appear not to' + '\n' +
	'Special bond with children and animals' + '\n' +
	'Quiet and reserved, except with people they know extremely well' + '\n' +
	'Trusting, sensitive, and kind' + '\n' +
	"Service-oriented; they're driven to help others" + '\n' +
	'Extremely well-developed appreciation for aesthetic beauty' + '\n' +
	'Likely to be original and unconventional' + '\n' +
	'Learn best with hands-on training' + '\n' +
	'Hate being confined to strict schedules and regimens' + '\n' +
	'Need space and freedom to do things their own way' + '\n' +
	'Dislike mundane, routine tasks, but will perform them if necessary' + '\n';
var strengths14 = 'ISFP Strengths:' + '\n' +
	'Warm, friendly and affirming by nature' + '\n' +
	'Usually optimistic' + '\n' +
	'Good listeners' + '\n' +
	'Good at dealing with practical day-to-day concerns' + '\n' +
	'Flexible and laid-back, usually willing to defer to their mates' + '\n' +
	'Their love of aesthetic beauty and appreciation for function makes them likely to have attractive, functional homes' + '\n' +
	'Take their commitments seriously, and seek lifelong relationships' + '\n' +
	"Likely to value and respect other's personal space" + '\n' +
	'Likely to enjoy showing their affection through acts and deeds' + '\n' +
	'Sensuous and earthy' + '\n';
var weaknesses14 = 'ISFP Weaknesses:' + '\n' +
	'Not good at long-range financial (or other) planning' + '\n' +
	'Extreme dislike of conflict and criticism' + '\n' +
	'Focused on enjoying the present moment, they may appear lazy or slow-moving at times' + '\n' +
	'Need to have their own space, and dislike having it invaded' + '\n' +
	'May be slow to show their affection with words' + '\n' +
	'Tendency to hold back their thoughts and feelings, unless drawn out' + '\n' +
	'May become overly cynical and practical' + '\n';
//15. ISTJ
var fullDescription15 = '(Introverted Sensing Thinking Judging)';
var traits15 = 'Value tradition, security, and peaceful living' + '\n' +
	'Will work long and hard to fulfill duties' + '\n' +
	'Can be depended on to follow through on tasks' + '\n' +
	'Loyal and faithful' + '\n' +
	'Stable, practical and down-to-earth' + '\n' +
	'Family-minded' + '\n' +
	"Dislike doing things which don't make sense to them" + '\n' +
	'Dislike abstract theory, unless they see the practical application' + '\n' +
	'Natural leaders' + '\n' +
	'Prefer to work alone, but work well in teams when necessary' + '\n' +
	'Extremely observant, they take in facts via their senses and store them internally' + '\n' +
	'Vast, rich inner store of facts which they rely on to understand problems which' + '\n' +
	'they encounter in their lives' + '\n' +
	'Profound respect for facts and concrete information' + '\n' +
	'Make decisions objectively, applying logic and rational thinking' + '\n' +
	"Dislike change, unless they are shown it's benefit in a concrete way" + '\n' +
	'Have strong opinions about the way things should be done' + '\n' +
	'Appreciate structured, orderly environments' + '\n' +
	'Have very high standards for their own behavior and the behavior of others' + '\n' +
	"Not naturally in-tune with other people's feelings" + '\n' +
	'Able to accomplish almost anything if they put their minds to it' + '\n' +
	'Community minded "good citizens"' + '\n';
var strengths15 = 'ISTJ Strengths:' + '\n' +
	'Honor their commitments' + '\n' +
	'Take their relationship roles very seriously' + '\n' +
	"Usually able to communicate what's on their minds with precision" + '\n' +
	'Good listeners' + '\n' +
	'Extremely good (albeit conservative) with money' + '\n' +
	'Able to take constructive criticism well' + '\n' +
	'Able to tolerate conflict situations without emotional upheaval' + '\n' +
	'Able to dole out punishment or criticism when called for' + '\n';
var weaknesses15 = 'ISTJ Weaknesses:' + '\n' +
	"Tendency to believe that they're always right" + '\n' +
	'Tendency to get involved in "win-lose" conversations' + '\n' +
	'Not naturally in-tune with what others are feeling' + '\n' +
	'Their value for structure may seem rigid to others' + '\n' +
	'Not likely to give enough praise or affirmation to their loved ones' + '\n';
//16. ISTP
var fullDescription16 = '(Introverted Sensing Thinking Perceiving)';
var traits16 = 'Interested in how and why things work' + '\n' +
	'Do not function well in regimented, structured environments; they will either feel stifled or become intensely bored' + '\n' +
	'Constantly gather facts about their environment and store them away' + '\n' +
	'Have an excellent ability to apply logic and reason to their immense store of facts to solve problems or discover how things work' + '\n' +
	'Learn best "hands-on"' + '\n' +
	"Usually able to master theory and abstract thinking, but don't particularly like dealing with it unless they see a practical application" + '\n' +
	'Action-oriented "doers"' + '\n' +
	'Focused on living in the present, rather than the future' + '\n' +
	'Love variety and new experiences' + '\n' +
	'Highly practical and realistic' + '\n' +
	'Excellent "trouble-shooters", able to quickly find solutions to a wide variety of practical problems' + '\n' +
	'Results-oriented; they like to see immediate results for their efforts' + '\n' +
	'Usually laid-back and easy-going with people' + '\n' +
	'Risk-takers who thrive on action' + '\n' +
	'Independent and determined - usually dislike committing themselves' + '\n' +
	'Usually quite self-confident' + '\n';
var strengths16 = 'ISTP Strengths:' + '\n' +
	'Good listeners' + '\n' +
	'Usually self-confident' + '\n' +
	'Generally optimistic and fun to be with' + '\n' +
	'Practical and realistic, they handle daily concerns' + '\n' +
	'Are not threatened by conflict or criticism' + '\n' +
	'Able to leave a relationship with relative ease once it is over' + '\n' +
	"Able to administer punishment, although they're not interested in doing so" + '\n' +
	"Likely to respect other's needs for space and privacy" + '\n';
var weaknesses16 = 'ISTP Weaknesses:' + '\n' +
	'Living entirely in the present, they have difficulty with long-term commitments' + '\n' +
	'Not naturally good at expressing feelings and emotions' + '\n' +
	'Not tuned in to what others are feeling, they may be insensitive at times' + '\n' +
	'Tendency to be overly private and hold back part of themselves' + '\n' +
	"Need a lot of personal space, which they don't like to have invaded" + '\n' +
	'They thrive on action and excitement, and may stir things up to create it' + '\n';


function extend(array, l) {
	return array.push.apply(array, l);
}

function escapeRegex(text) {
	// from http://simonwillison.net/2006/Jan/20/escape/#p-6
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

var json_trie = fs.readFileSync('liwc_2007.trie', 'utf8');
var _trie = JSON.parse(json_trie);
var categories = ['funct', 'pronoun', 'ppron', 'i', 'we', 'you', 'shehe', 'they', 'ipron', 'article', 'verb', 'auxverb', 'past', 'present', 'future', 'adverb', 'preps', 'conj', 'negate', 'quant', 'number', 'swear', 'social', 'family', 'friend', 'humans', 'affect', 'posemo', 'negemo', 'anx', 'anger', 'sad', 'cogmech', 'insight', 'cause', 'discrep', 'tentat', 'certain', 'inhib', 'incl', 'excl', 'percept', 'see', 'hear', 'feel', 'bio', 'body', 'health', 'sexual', 'ingest', 'relativ', 'motion', 'space', 'time', 'work', 'achieve', 'leisure', 'home', 'money', 'relig', 'death', 'assent', 'nonfl', 'filler'];
var full_columns = ['WC', 'WPS', 'Sixltr', 'Dic', 'Numerals'];
var punctuations = [{
		name : 'Period',
		chars : '.'
	}, {
		name : 'Comma',
		chars : ','
	}, {
		name : 'Colon',
		chars : ':'
	}, {
		name : 'SemiC',
		chars : ';'
	}, {
		name : 'QMark',
		chars : '?'
	}, {
		name : 'Exclam',
		chars : '!'
	}, {
		name : 'Dash',
		chars : '-'
	}, {
		name : 'Quote',
		chars : '"'
	}, {
		name : 'Apostro',
		chars : "'"
	}, {
		name : 'Parenth',
		chars : '()[]{}'
	}, {
		name : 'OtherP',
		chars : '#$%&*+-/<=>@\\^_`|~'
	}
];
extend(full_columns, categories); // exclude filler? is that a bug?
extend(full_columns, ['Period', 'Comma', 'Colon', 'SemiC', 'QMark', 'Exclam', 'Dash', 'Quote', 'Apostro', 'Parenth', 'OtherP', 'AllPct']);
for (var p in punctuations) {
	var raw = punctuations[p].chars.split('').map(escapeRegex).join('|');
	punctuations[p].regex = new RegExp(raw, 'ig');
}

function _walk(token, i, cursor) {
	if ('*' in cursor)
		return cursor['*'];
	if ('$' in cursor && i === token.length)
		return cursor['$'];
	if (i < token.length) {
		var letter = token[i];
		if (letter in cursor)
			return _walk(token, i + 1, cursor[letter]);
	}
	return [];
}

function tokenwise(tokens) {
	return tokens.map(function (token) {
		return _walk(token, 0, _trie);
	});
}

function fromTokens(tokens) {
	var counts = {
		Dic : 0,
		WC : tokens.length
	};
	for (var i in categories)
		counts[categories[i]] = 0;

	for (var j in tokens) {
		var cats = _walk(tokens[j], 0, _trie);
		if (cats.length) {
			for (var k in cats) {
				counts[cats[k]]++;
			}
			counts.Dic++;
		}
	}

	return counts;
}

function fromText(text, opts) {
	if (opts === undefined)
		opts = {
			normalize : true
		};
	// 'split' produces about 300 more on the brown corpus than 'match' below
	var tokens = text.toLowerCase().split(/[^'a-z0-9A-Z]+/ig);
	// var tokens = text.toLowerCase().match(/[a-z]['a-z]*/g) || [''];
	var sentence_count = (text.match(/[.!?]+/g) || ['']).length;
	var sixltr = 0,
	numerals = 0;
	for (var i in tokens) {
		var token = tokens[i];
		if (token.length > 6)
			sixltr++;
		if (token.match(/^\d+$/))
			numerals++;
	}

	var counts = fromTokens(tokens);
	// Words per sentence is kind of weird if we're not proceeding incrementally.
	// We just count min(sentence-markers, 1) if normalize == false.
	// But then, the natural thing to do would be to count sentences per word in the LIWC analysis,
	// like everything else, and calculate 1/sentences per word, in post-processing, to get WPS
	counts.WPS = opts.normalize ? counts.WC / sentence_count : sentence_count;
	counts.Sixltr = sixltr;
	counts.Numerals = numerals;

	counts.AllPct = 0;
	for (var j in punctuations) {
		var punc = punctuations[j];
		counts[punc.name] = (text.match(punc.regex) || []).length;
		counts.AllPct += counts[punc.name];
	}
	// N.B.: I am ignoring the LIWC standard of dividing parentheses by two!
	// counts.Parenth = counts.Parenth / 2.0;
	// for (var k in punctuations)

	if (opts.normalize) {
		for (var c = 2; (column = full_columns[c]); c++) {
			counts[column] = counts[column] / counts.WC;
		}
	}

	return counts;
	//console.dir(counts)
}

function compute_result(sample_text) {

	var counts = fromText(sample_text);
	var formality = (counts[categories[16]] + counts[categories[9]] + counts[categories[18]] + counts[categories[29]] + counts[categories[31]] + counts[categories[44]] + counts[categories[38]] - counts[categories[1]] - counts[categories[10]] - counts[categories[22]] - counts[categories[15]] + 1) / 2;
	var intuition = (counts[categories[7]] + counts[categories[46]] + counts[categories[51]] - counts[categories[29]] - counts[categories[54]] - counts[categories[55]] - counts[categories[31]] + 1) / 2;
	var thinking = (counts[categories[12]] + counts[categories[42]] - counts[categories[45]] - counts[categories[44]] + 1) / 2;
	var judging = (counts[categories[15]] - counts[categories[5]] - counts[categories[51]] + 1) / 2;
	var wps = counts[full_columns[1]];
	var sixltr = counts[full_columns[2]];

	//rules
	var dim1 = (wps >= 14 && formality >= 0.5) ? "I" : "E";
	var dim2 = (intuition >= 0.5) ? "N" : "S";
	var dim3 = (thinking >= 0.5) ? "T" : "F";
	var dim4 = (judging >= 0.5) ? "J" : "P";
	var personality = dim1 + dim2 + dim3 + dim4;
	var type = 0;
	var fullDescription = '';
	var traits = '';
	var strengths = '';
	var weaknesses = '';
	var name = '';
	switch (personality) {
	case "ENFJ":
	fullDescription = fullDescription1;
	traits = traits1;
	strengths = strengths1;
	weaknesses = weaknesses1;
	name = "the Giver.";
	break;
	case "ENTJ":
	fullDescription = fullDescription2;
	traits = traits2;
	strengths = strengths2;
	weaknesses = weaknesses2;
	name = "the Executive.";
	break;
	case "ENFP":
	fullDescription = fullDescription3;
	traits = traits3;
	strengths = strengths3;
	weaknesses = weaknesses3;
	name = "the Inspirer.";
	break;
	case "ENTP":
	fullDescription = fullDescription4;
	traits = traits4;
	strengths = strengths4;
	weaknesses = weaknesses4;
	name = "the Visionary.";
	break;
	case "ESFJ":
	fullDescription = fullDescription5;
	traits = traits5;
	strengths = strengths5;
	weaknesses = weaknesses5;
	name = "the Caregiver.";
	break;
	case "ESFP":
	fullDescription = fullDescription6;
	traits = traits6;
	strengths = strengths6;
	weaknesses = weaknesses6;
	name = "the Performer.";
	break;
	case "ESTJ":
	fullDescription = fullDescription7;
	traits = traits7;
	strengths = strengths7;
	weaknesses = weaknesses7;
	name = "the Guardian.";
	break;
	case "ESTP":
	fullDescription = fullDescription8;
	traits = traits8;
	strengths = strengths8;
	weaknesses = weaknesses8;
	name = "the Doer.";
	break;
	case "INFJ":
	fullDescription = fullDescription9;
	traits = traits9;
	strengths = strengths9;
	weaknesses = weaknesses9;
	name = "the Protector.";
	break;
	case "INFP":
	fullDescription = fullDescription10;
	traits = traits10;
	strengths = strengths10;
	weaknesses = weaknesses10;
	name = "the Idealist.";
	break;
	case "INTJ":
	fullDescription = fullDescription11;
	traits = traits11;
	strengths = strengths11;
	weaknesses = weaknesses11;
	name = "the Scientist.";
	break;
	case "INTP":
	fullDescription = fullDescription12;
	traits = traits12;
	strengths = strengths12;
	weaknesses = weaknesses12;
	name = "the Thinker.";
	break;
	case "ISFJ":
	fullDescription = fullDescription13;
	traits = traits13;
	strengths = strengths13;
	weaknesses = weaknesses13;
	name = "the Nurturer.";
	break;
	case "ISFP":
	fullDescription = fullDescription14;
	traits = traits14;
	strengths = strengths14;
	weaknesses = weaknesses14;
	name = "the Artist.";
	break;
	case "ISTJ":
	fullDescription = fullDescription15;
	traits = traits15;
	strengths = strengths15;
	weaknesses = weaknesses15;
	name = "the Duty Fufiller.";
	break;
	case "ISTP":
	fullDescription = fullDescription16;
	traits = traits16;
	strengths = strengths16;
	weaknesses = weaknesses16;
	name = "the Mechanic.";
	break;
	}

	//Show results, which give you your personality type, the strengths and weaknesses of this type of personality
	//console.log('Your personality type is: ' + personality + fullDescription + ', ' + name + '\n' );
	//console.log(personality + ' traits: \n' + traits);
	//console.log(strengths);
	//console.log(weaknesses);
	results = personality + fullDescription + name + traits + strengths + weaknesses;
	return results;
}

var sample_text = "I am not very happy.";
var results = compute_result(sample_text);
console.log(results);

/*******************************************************************************/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
});

var server = app.listen(SERVER_PORT, function() {
	console.log('listening on port ', SERVER_PORT);
});