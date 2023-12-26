/**
 * Text generation class
 */
const TYPE_WORDS = 'words'
const TYPE_PARAGRAPHS = 'paragraphs'
const typeList = [TYPE_WORDS, TYPE_PARAGRAPHS]

class TextGenerator {
    factory = null
    count = 1
    paragraphSentences = 5
    genType = TYPE_WORDS
    lastParagraphs = []
    lastSentences = []

    constructor(factory = null) {
        if (factory) {
            this.factory = factory
        }
    }

    setType(genType) {
        if (typeList.includes(genType)) {
            this.genType = genType
        }

        return this
    }

    setCount(newCount) {
        newCount = parseInt(newCount)
        if (newCount != null && newCount > 0 && newCount < 100000) {
            this.count = newCount
        }

        return this
    }

    generateString(count) {
        if (count == null) {
            count = this.count
        }

        let sentences

        if (this.genType === TYPE_WORDS) {
            sentences = this._getSentencesByWord(count)
        } else {
            sentences = this._getSentencesByParagraph(count)
        }

        return this._getParagraphString(sentences)
    }

    _getSentence() {
        if (!this.factory) {
            return ''
        }
        return this.factory.getSentence()
    }

    _getSentencesByWord(count) {
        let wordCount = 0
        const sentences = []
        while (wordCount < count) {
            let sentence = this._getSentence()
            let sentenceWordCount = sentence.wordCount()

            if ((wordCount + sentenceWordCount) > count) {
                //cut sentence
                sentenceWordCount = count - wordCount
                sentence = sentence.trim()
                    .split(/\s+/)
                    .slice(0, sentenceWordCount)
                    .join(' ') + '.'
            }
            wordCount += sentenceWordCount
            sentences.push(sentence)
        }

        return sentences
    }

    _getSentencesByParagraph(count) {
        const sentenceCount = this.paragraphSentences * count
        const sentences = []
        for (let i = 0; i < sentenceCount; i++) {
            sentences.push(this._getSentence())
        }

        return sentences
    }

    _getParagraphString(sentences, betweenString, startString, endString) {
        if (typeof betweenString == 'undefined') {
            betweenString = "\n\n"
        }
        if (typeof startString == 'undefined') {
            startString = ""
        }
        if (typeof endString == 'undefined') {
            endString = ""
        }

        //group sentences into paragraphs.
        const pCount = this.paragraphSentences
        let currentParagraph = -1
        const paragraphs = []
        for (let i = 0, l = sentences.length; i < l; i++) {
            if (i % pCount === 0) {
                currentParagraph++
            }
            if (!paragraphs[currentParagraph]) {
                paragraphs[currentParagraph] = []
            }

            paragraphs[currentParagraph].push(sentences[i])
        }

        //store sentences and grouped paragraphs

        this.lastSentences = sentences
        this.lastParagraphs = paragraphs

        for (let i = 0, l = paragraphs.length; i < l; i++) {
            paragraphs[i] = startString + (paragraphs[i].join(' ')) + endString
        }

        return paragraphs.join(betweenString)
    }
}

class StringFactory {
    adverbs = []
    verbs = []
    adjectives = []
    nouns = []
    conjunctions = []

    getVerb() {
        return this.verbs.random()
    }

    getAdverb() {
        return this.adverbs.random()
    }

    getAdjective() {
        return this.adjectives.random()
    }

    getNoun() {
        return this.nouns.random()
    }

    getConjunction() {
        return this.conjunctions.random()
    }

    getSentence() {
        return [
            this.getAdverb().ucFirst(),
            this.getVerb(),
            this.getAdjective(),
            this.getNoun(),
            this.getConjunction(),
            this.getAdjective(),
            this.getNoun()
        ].join(' ') + '.'
    }
}

class IpsumFactory extends StringFactory {
    adverbs = [
        'appropriately', 'assertively', 'authoritatively', 'collaboratively', 'compellingly', 'competently', 'completely',
        'continually', 'conveniently', 'credibly', 'distinctively', 'dramatically', 'dynamically', 'efficiently',
        'energistically', 'enthusiastically', 'globally', 'holisticly', 'interactively', 'intrinsicly', 'monotonectally',
        'objectively', 'phosfluorescently', 'proactively', 'professionally', 'progressively', 'quickly', 'rapidiously',
        'seamlessly', 'synergistically', 'uniquely'
    ]

    verbs = [
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
    ]

    adjectives = [
        '24/7', '24/365', 'accurate', 'adaptive', 'alternative', 'an expanded array of', 'B2B', 'B2C', 'backend',
        'backward-compatible', 'best-of-breed', 'bleeding-edge', 'bricks-and-clicks', 'business', 'clicks-and-mortar',
        'client-based', 'client-centered', 'client-centric', 'client-focused', 'collaborative', 'compelling', 'competitive',
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
    ]

    nouns = [
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
    ]

    conjunctions = [
        'through', 'via', 'vis-a-vis', 'with', 'without', 'and', 'before', 'after', 'whereas', 'for', 'rather than'
    ]
}
