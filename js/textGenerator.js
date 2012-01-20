/**
 * Text generation class
 */ 
var TextGenerator = Class.extend({
    factory : null,
    
    count : 1,
    blockType : null,
    paragraphSentences : 5,
    
    TYPE_WORDS : 'words',
    TYPE_PARAGRAPHS : 'paragraphs',
        
    typeList : ['words', 'paragraphs'],
    
    genType : 'words',
    
    lastParagraphs : [],
    lastSentences : [],
    
    init : function(factory) {
        if(factory) {
            this.setFactory(factory);
        }
    },
    
    setType : function(genType) {
        if(this.typeList.indexOf(genType) !== -1) {
            this.genType = genType;
        }

        return this;
    },
    
    
    setCount : function(newCount) {
        newCount = parseInt(newCount);
        if ( ! isNaN(newCount) && newCount > 0 && newCount < 100000) {
            this.count = newCount;
        }

        return this;
    },
    
    getFactory : function() {
        return this.factory;
    },
    
    setFactory : function(factory) {
        this.factory = factory;
        
        return this;
    },
        
    generateString : function(count) {
        if( ! count) {
            count = this.count;
        }
        var sentences;
        
        if(this.genType == this.TYPE_WORDS) {
            sentences = this._getSentencesByWord(count);
        } else {
            sentences = this._getSentencesByParagraph(count);
        }

        return this._getParagraphString(sentences);
    },
    
    _getSentence : function() {
        var factory = this.getFactory();

        if( ! factory) {
            return '';
        }
        return factory.getSentence();
    },
    
    _getSentencesByWord : function(count) {
        var wordCount = 0;
        var factory = this.getFactory();
        var sentences = [];
        while (wordCount < count) {

            var sentence = this._getSentence();
            var sentenceWordCount = sentence.wordCount();
            if ((wordCount + sentenceWordCount) > count) {
                //cut sentence
                sentenceWordCount = count - wordCount;
                sentence = sentence.trim()
                                   .split(/\s+/)
                                   .slice(0, sentenceWordCount)
                                   .join(' ') + '.';
            }
            wordCount += sentenceWordCount;
            sentences.push(sentence);
        }
        
        return sentences;
    },
    
    _getSentencesByParagraph : function(count) {
        var sentenceCount = this.paragraphSentences * count;
        var factory = this.getFactory();
        var sentences = [];
        for (var i=0, l=sentenceCount; i<l; i++) {
            sentences.push(this._getSentence());
        }
        
        return sentences;
    },
    
    _getParagraphString : function(sentences, betweenString, startString, endString) {
        if (typeof betweenString == 'undefined') {
            betweenString = "\n\n";
        }
        if (typeof startString == 'undefined') {
            startString = "";
        }
        if (typeof endString == 'undefined') {
            endString = "";
        }
        
        //group sentences into paragraphs.
        var pCount = this.paragraphSentences;
        var currentParagraph = -1;
        var paragraphs = [];
        for (var i=0, l=sentences.length; i<l; i++) {
            if(i % pCount == 0) {
                currentParagraph++ ;
            }
            if( ! paragraphs[currentParagraph])paragraphs[currentParagraph] = [];
            
            paragraphs[currentParagraph].push(sentences[i]);
        }
        
        //store sentences and grouped paragraphs
        
        this.lastSentences = sentences;
        this.lastParagraphs = paragraphs;
        
        for (var i=0, l=paragraphs.length; i<l; i++) {
            paragraphs[i] = startString + (paragraphs[i].join(' ')) + endString;
        }
        
        return paragraphs.join(betweenString);
    }    
});

var StringFactory = Class.extend({
    generator   : null,
    adverbs     : [],
    verbs       : [],
    adjectives  : [],
    nouns       : [],
    conjunctions: [],
    
    getVerb : function() {
        return this.verbs.random();
    },
    getAdverb : function() {
        return this.adverbs.random();
    },
    getAdjective : function() {
        return this.adjectives.random();
    },
    getNoun : function() {
        return this.nouns.random();
    },
    getConjunction : function () {
        return this.conjunctions.random();
    },
    getSentence : function() {
        var wordList = [
          this.getAdverb().ucFirst(), 
          this.getVerb(),
          this.getAdjective(),
          this.getNoun(),
          this.getConjunction(),
          this.getAdjective(),
          this.getNoun()];
        return wordList.join(' ') + '.';
    }
});

var IpsumFactory = StringFactory.extend({
    adverbs : [
      'appropriately', 'assertively', 'authoritatively', 'collaboratively', 'compellingly', 'competently', 'completely',
      'continually', 'conveniently', 'credibly', 'distinctively', 'dramatically', 'dynamically', 'efficiently',
      'energistically', 'enthusiastically', 'globally', 'holisticly', 'interactively', 'intrinsicly', 'monotonectally',
      'objectively', 'phosfluorescently', 'proactively', 'professionally', 'progressively', 'quickly', 'rapidiously',
      'seamlessly', 'synergistically', 'uniquely'
    ],

    verbs : [
      'actualize', 'administrate', 'aggregate', 'architect', 'benchmark', 'brand', 'build', 'communicate', 'conceptualize',
      'coordinate', 'create', 'cultivate', 'customize', 'deliver', 'deploy', 'develop', 'disintermediate', 'disseminate',
      'drive', 'embrace', 'e-enable', 'empower', 'enable', 'engage', 'engineer', 'enhance', 'envisioneer', 'evisculate',
      'evolve', 'expedite', 'exploit', 'extend', 'fabricate', 'facilitate', 'fashion', 'formulate', 'foster', 'generate',
      'grow', 'harness', 'impact', 'implement', 'incentivize', 'incubate', 'initiate', 'innovate', 'integrate', 'iterate',
      'leverage existing', 'leverage other\'s', 'maintain', 'matrix', 'maximize', 'mesh', 'monetize', 'morph', 'myocardinate',
      'negotiate', 'network', 'optimize', 'orchestrate', 'parallel task', 'plagiarize', 'pontificate', 'predominate',
      'procrastinate', 'productivate', 'productize', 'promote', 'provide access to', 'pursue', 'recaptiualize',
      'reconceptualize', 'redefine', 're-engineer', 'reintermediate', 'reinvent', 'repurpose', 'restore', 'revolutionize',
      'scale', 'seize', 'simplify', 'strategize', 'streamline', 'supply', 'syndicate', 'synergize', 'synthesize', 'target',
      'transform', 'transition', 'underwhelm', 'unleash', 'utilize', 'visualize', 'whiteboard'
    ],

  adjectives : [
      '24/7', '24/365', 'accurate', 'adaptive', 'alternative', 'an expanded array of', 'B2B', 'B2C', 'backend',
      'backward-compatible', 'best-of-breed', 'bleeding-edge', 'bricks-and-clicks', 'business', 'clicks-and-mortar',
      'client-based', 'client-centered', 'client-centric', 'client-focused', 'collaborative', 'compelling',  'competitive',
      'cooperative', 'corporate', 'cost effective', 'covalent', 'cross functional', 'cross-media', 'cross-platform',
      'cross-unit', 'customer directed', 'customized', 'cutting-edge', 'distinctive', 'distributed', 'diverse', 'dynamic',
      'e-business', 'economically sound', 'effective', 'efficient', 'emerging', 'empowered', 'enabled', 'end-to-end',
      'enterprise', 'enterprise-wide', 'equity invested', 'error-free', 'ethical', 'excellent', 'exceptional', 'extensible',
      'extensive', 'flexible', 'focused', 'frictionless', 'front-end', 'fully researched', 'fully tested', 'functional',
      'functionalized', 'future-proof', 'global', 'go forward', 'goal-oriented', 'granular', 'high standards in',
      'high-payoff', 'high-quality', 'highly efficient', 'holistic', 'impactful', 'inexpensive', 'innovative',
      'installed base', 'integrated', 'interactive', 'interdependent', 'intermandated', 'interoperable', 'intuitive',
      'just in time', 'leading-edge', 'leveraged', 'long-term high-impact', 'low-risk high-yield', 'magnetic',
      'maintainable', 'market positioning', 'market-driven', 'mission-critical', 'multidisciplinary', 'multifunctional',
      'multimedia based', 'next-generation', 'one-to-one', 'open-source', 'optimal', 'orthogonal', 'out-of-the-box',
      'pandemic', 'parallel', 'performance based', 'plug-and-play', 'premier', 'premium', 'principle-centered', 'proactive',
      'process-centric', 'professional', 'progressive', 'prospective', 'quality', 'real-time', 'reliable', 'resource sucking',
      'resource maximizing', 'resource-leveling', 'revolutionary', 'robust', 'scalable', 'seamless', 'stand-alone',
      'standardized', 'standards compliant', 'state of the art', 'sticky', 'strategic', 'superior', 'sustainable',
      'synergistic', 'tactical', 'team building', 'team driven', 'technically sound', 'timely', 'top-line', 'transparent',
      'turnkey', 'ubiquitous', 'unique', 'user-centric', 'user friendly', 'value-added', 'vertical', 'viral', 'virtual',
      'visionary', 'web-enabled', 'wireless', 'world-class', 'worldwide', '2.0'
    ],

    nouns : [
      'action items', 'alignments', 'applications', 'architectures', 'bandwidth', 'benefits',
      'best practices', 'catalysts for change', 'channels', 'collaboration and idea-sharing', 'communities', 'content',
      'convergence', 'core competencies', 'customer service', 'data', 'deliverables', 'e-business', 'e-commerce', 'e-markets',
      'e-tailers', 'e-services', 'experiences', 'expertise', 'functionalities', 'growth strategies', 'human capital',
      'ideas', 'imperatives', 'infomediaries', 'information', 'infrastructures', 'initiatives', 'innovation',
      'intellectual capital', 'interfaces', 'internal or "organic" sources', 'leadership', 'leadership skills',
      'manufactured products', 'markets', 'materials', 'meta-services', 'methodologies', 'methods of empowerment', 'metrics',
      'mindshare', 'models', 'networks', 'niches', 'niche markets', 'opportunities', '"outside the box" thinking', 'outsourcing',
      'paradigms', 'partnerships', 'platforms', 'portals', 'potentialities', 'process improvements', 'processes', 'products',
      'quality vectors', 'relationships', 'resources', 'results', 'ROI', 'scenarios', 'schemas', 'services', 'solutions',
      'sources', 'strategic theme areas', 'supply chains', 'synergy', 'systems', 'technologies', 'technology',
      'testing procedures', 'total linkage', 'users', 'value', 'vortals', 'web-readiness', 'web services'
    ],
    
    conjunctions : [
      'through', 'via', 'vis-a-vis', 'with', 'without', 'and', 'before', 'after', 'whereas', 'for', 'rather than'
    ],
    
    getSentence : function() {
        //overrideable
        return this._super();
    }
});

