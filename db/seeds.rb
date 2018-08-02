# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

word_array = ["abate", "aberrant", "abjure", "abscond", "abstain", "acumen",
  "admonish" "adulterate" "advocate", "aesthetic", "affectation",
  "aggrandize", "alacrity", "alleviate", "amalgamate", "ambiguous", "ambivalent",
  "ameliorate", "amenable", "anachronism", "analogous", "anoint", "anomaly", "antipathy",
  "antithetical", "apathy", "appease", "arbitrary", "arcane",
  "archaic", "arduous", "articulate", "artless", "ascetic", "assuage",
  "astonishment", "audacious", "austere", "avarice", "aver",
  "banal", "belie", "benign", "biased", "bolster", "bombastic", "brazen",
  "bucolic", "burgeon", "cacophony", "calumny", "candid",  "canon", "capacity", "capricious",
  "castigate", "catalyst", "caustic", "censure", "chauvinist", "chicanery", "chronological", "coalesce", "cogent",
  "commensurate", "compelling", "comprehensive", "condone", "confound", "connoisseur", "consequential", "construe",
  "consumption", "contend", "contentious", "contrite", "convoluted", "copious", "cosmopolitan", "covet", "craft", "craven",
  "credence", "credulous", 'decorum', "deference", "deflect", "deftness", "delineate", "demur", "denigrate", "deride",
  "derivative", "desiccate", "desultory", "detachment", "determinant", "diatribe", "didactic", "diffident", "dilettante",
  "dirge", "disabuse", "discern", "discrepancy", "disinterested", "disparage", "disparate", "dispassionate", "disregard",
  "dissemble", "disseminate", "dissonance", "diverge", "dogma", "dupe", "ebullient", "eccentric", "eclectic", "efficacy", "elegy",
  "elicit", "eloquence", "eminent", "empirical", "emulate", "enervate", "engender", "enhance", "entitlement", "ephemeral",
  "equable", "equivocate", "erroneous", "erudite", "eschew", "esoteric", "estimable", "eulogy", "exacerbate", "exacting",
  "exculpate", "exigent", "exonerate", "expatiate", "explicate", "exposition", "extraneous", "extrapolate", "facetious",
  "facilitate", "fallacious", "fastidious", "fluctuate", "foment", "forestall", "fortuitous", "frugal", "gainsay", "galvanize",
  "garrulous", "gauche", "germane", "glib", "gregarious", "guile", "hackneyed", "harangue", "hedonism", "hierarchical",
  "homogenous", 'hyperbole', 'iconoclast', "ideological", "imminent", "immutable", "impair", "impediment", 'imperturbable',
  'implacable', 'implicit', 'imprudence', 'impudent', 'inadvertent', 'Inchoate', 'inconclusive', 'indebted', 'indefatigable',
  'indolent', 'infer', 'ingenuous', 'inimical', 'Innocuous', 'inscrutable', 'insipid', 'insular', 'intensive', 'intermediary',
  'intimate', 'intractable', 'intransigent', 'intrepid', 'inveterate', 'invulnerable', 'irascible', 'irresolute', 'laconic',
  'laud', 'laudable', 'litigation', 'loquacious', 'lucid', 'luminous', 'magnanimity', 'maladroit', 'malign', 'malleable',
  'maverick', 'mendacity', 'mercurial', 'meticulous', 'misanthrope', 'mitigate', 'modest', 'mollify', 'monotony', 'mundane',
  'munificent', 'naïve', 'nascent', 'neglect', 'nonplussed', 'notoriety', 'nuance', 'obdurate', 'obscure', 'obsequious',
  'obstinate', 'obviate', 'occlude', 'occult', 'offset', 'olfactory', 'omniscience', 'onerous', 'opaque', 'opportunism',
  'opprobrium', 'oscillate', 'ostentatious', 'outstrip', 'overshadow', 'painstaking', 'partial', 'partisan', 'patent', 'paucity',
  'pedantic', 'pedestrian', 'perfidy', 'perfunctory', 'peripheral', 'permeate', 'perseverance', 'peruse', 'pervasive',
  'phenomena', 'phlegmatic', 'pith', 'placate', 'plastic', 'platitude', 'plausible', 'plethora', 'plummet', 'polarize',
  'polemical', 'pragmatic', 'precarious', 'preceded', 'precipitate', 'precursor', 'prescient', 'presumptuous', 'prevail',
  'prevaricate', 'pristine', 'probity', 'prodigal', 'prodigious', 'profligate', 'proliferate', 'propitiate', 'propriety',
  'prospective', 'qualification', 'quotidian', 'rationalize', 'reconcile', 'recondite', 'refute', 'relentless', 'relevant',
  'reproach', 'repudiate', 'rescind', 'respectively', 'reticent', 'reverent', 'rhetoric', 'salubrious', 'sanction','satiate',
  'secular', 'sediment', 'sedulous', 'simultaneous', 'solicitous', 'soporific', 'sparse', 'specious', 'sporadic',
  'spurious', 'stolid', 'subjective', 'substantiate', 'subversive', 'sufficient', 'superbly', 'supine', 'supplant', 'sycophant',
  'synthesize', 'tacit', 'taciturn', 'temperance', 'tenuous', 'timorous', 'tirade', 'torpor', 'tortuous', 'tractable',
  'transient', 'ubiquitous', 'unadorned', 'undermine', 'underscore', 'untenable', 'vacillate', 'venality',
  'venerate', 'veracity', 'verbose', 'vexation', 'volatile', 'whimsical', 'zeal']

  word_array2 = ['account', 'act', 'addition', 'adjustment', 'advertisement', 'agreement', 'air', 'amount', 'amusement', 'animal', 'answer', 'apparatus', 'approval','argument', 'art',
     'attack', 'attempt', 'attention', 'attraction', 'authority', 'back', 'balance', 'base', 'behaviour', 'belief', 'birth', 'bit', 'bite', 'blood', 'blow', 'body', 'brass', 'bread', 'breath', 'brother',
      'building', 'burn', 'business', 'butter','canvas', 'care', 'cause', 'chalk', 'chance', 'change', 'cloth', 'coal', 'colour', 'comfort', 'committee', 'company', 'comparison', 'competition', 'condition',
      'connection', 'control', 'cook', 'copper', 'copy', 'cork', 'cotton', 'cough', 'country', 'cover', 'crack', 'credit', 'crime', 'crush', 'cry', 'current', 'curve', 'damage', 'danger', 'daughter',
       'day', 'death', 'debt', 'decision', 'degree', 'design', 'desire', 'destruction', 'detail', 'development', 'digestion', 'direction', 'discovery', 'discussion', 'disease', 'disgust', 'distance', 'distribution', 'division', 'doubt',
        'drink', 'driving', 'dust', 'earth', 'edge', 'education', 'effect', 'end', 'error', 'event', 'example', 'exchange', 'existence', 'expansion','experience', 'expert', 'fact', 'fall', 'family', 'father',
         'fear', 'feeling', 'fiction', 'field', 'fight', 'fire', 'flame', 'flight', 'flower', 'fold', 'food', 'force', 'form', 'friend', 'front', 'fruit', 'glass', 'gold', 'government', 'grain',
          'grass', 'grip', 'group', 'growth', 'guide', 'harbour',
          'harmony', 'hate', 'hearing', 'heat', 'help', 'history', 'hole', 'hope', 'hour', 'humour', 'ice', 'idea', 'impulse', 'increase', 'industry', 'ink', 'insect', 'instrument', 'insurance', 'interest',
          'invention', 'iron', 'jelly', 'join', 'journey', 'judge', 'jump', 'kick', 'kiss', 'knowledge', 'land', 'language', 'laugh',
           'law', 'lead', 'learning', 'leather', 'letter', 'level', 'lift', 'light', 'limit', 'linen', 'liquid', 'list', 'look', 'loss', 'love', 'machine', 'man', 'manager', 'mark', 'market',
           'mass', 'meal', 'measure', 'meat', 'meeting', 'memory', 'metal', 'middle',
            'milk', 'mind', 'mine', 'minute', 'mist', 'money', 'month', 'morning', 'mother', 'motion', 'mountain', 'move', 'music', 'name', 'nation', 'need', 'news', 'night', 'noise', 'note',
            'number', 'observation', 'offer', 'oil', 'operation', 'opinion', 'order', 'organization', 'ornament', 'owner', 'page', 'pain', 'paint', 'paper', 'part', 'paste', 'payment', 'peace', 'person', 'place',
            'plant', 'play', 'pleasure',
             'point', 'poison', 'polish', 'porter', 'position', 'powder', 'power', 'price', 'print', 'process', 'produce', 'profit', 'property', 'prose', 'protest', 'pull', 'punishment', 'purpose', 'push',
              'quality','question', 'rain', 'range', 'rate', 'ray', 'reaction', 'reading', 'reason', 'record', 'regret', 'relation', 'religion', 'representative', 'request', 'respect', 'rest', 'reward', 'rhythm', 'rice',
               'river', 'road', 'roll', 'room', 'rub', 'rule', 'run', 'salt', 'sand', 'scale', 'science', 'sea', 'seat', 'secretary', 'selection', 'self', 'sense', 'servant', 'sex', 'shade',
                'shake', 'shame', 'shock', 'side', 'sign', 'silk', 'silver', 'sister',
              'size', 'sky', 'sleep', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke', 'sneeze', 'snow', 'soap', 'society', 'son', 'song', 'sort', 'sound', 'soup', 'space', 'stage',
               'start', 'statement', 'steam', 'steel', 'step', 'stitch', 'stone', 'stop', 'story', 'stretch', 'structure', 'substance', 'sugar', 'suggestion', 'summer', 'support', 'surprise', 'swim', 'system', 'talk',
                'taste', 'tax', 'teaching', 'tendency', 'test', 'theory', 'thing', 'thought', 'thunder', 'time', 'tin', 'top', 'touch', 'trade', 'transport', 'trick', 'trouble', 'turn', 'twist', 'unit',
                 'use', 'value', 'verse', 'vessel', 'view', 'voice', 'walk', 'war', 'wash', 'waste', 'water', 'wave', 'wax', 'way', 'weather', 'week', 'weight', 'wind', 'wine', 'winter',
                  'woman',
               'wood', 'wool', 'word', 'work', 'wound', 'writing', 'year', 'angle', 'ant', 'apple', 'arch', 'arm', 'army', 'baby', 'bag', 'ball', 'band', 'basin', 'basket', 'bath',
                'bed', 'bee', 'bell', 'berry', 'bird', 'blade', 'board', 'boat', 'bone', 'book', 'boot', 'bottle', 'box', 'boy', 'brain', 'brake', 'branch', 'brick', 'bridge', 'brush',
                 'bucket', 'bulb', 'button', 'cake', 'camera', 'card', 'cart', 'carriage', 'cat', 'chain', 'cheese', 'chest', 'chin', 'church', 'circle', 'clock', 'cloud', 'coat', 'collar', 'comb',
                 'cord', 'cow', 'cup', 'curtain', 'cushion', 'dog', 'door', 'drain', 'drawer', 'dress', 'drop', 'ear', 'egg', 'engine', 'eye', 'face', 'farm', 'feather', 'finger', 'fish',
                 'flag', 'floor', 'fly', 'foot', 'fork', 'fowl', 'frame', 'garden', 'girl', 'glove', 'goat', 'gun', 'hair', 'hammer', 'hand', 'hat',
                'head', 'heart', 'hook', 'horn', 'horse', 'hospital', 'house', 'island', 'jewel', 'kettle', 'key', 'knee', 'knife', 'knot', 'leaf', 'leg', 'library', 'line', 'lip', 'lock',
                 'map', 'match', 'monkey', 'moon', 'mouth', 'muscle', 'nail', 'neck', 'needle', 'nerve', 'net', 'nose', 'nut', 'office', 'orange', 'oven', 'parcel', 'pen', 'pencil', 'picture',
                 'pig', 'pin', 'pipe', 'plane', 'plate', 'plough', 'pocket', 'pot', 'potato', 'prison', 'pump', 'rail', 'rat', 'receipt', 'ring', 'rod', 'roof', 'root', 'sail', 'school',
                 'scissors', 'screw', 'seed', 'sheep', 'shelf', 'ship', 'shirt', 'shoe', 'skin', 'skirt', 'snake', 'sock', 'spade', 'sponge', 'spoon', 'spring', 'square', 'stamp', 'star', 'station',
                 'stem', 'stick', 'stocking', 'stomach', 'store', 'street', 'sun', 'table', 'tail', 'thread', 'throat', 'thumb', 'ticket', 'toe', 'tongue', 'tooth', 'town', 'train',
                 'tray', 'tree', 'trousers', 'umbrella', 'wall', 'watch', 'wheel', 'whip', 'whistle', 'window', 'wing', 'wire', 'worm', 'able', 'acid', 'angry', 'automatic', 'beautiful', 'black', 'boiling',
                 'bright', 'broken', 'brown', 'cheap', 'chemical', 'chief', 'clean', 'clear', 'common', 'complex', 'conscious', 'cut', 'deep', 'dependent', 'early', 'elastic', 'electric', 'equal', 'fat', 'fertile',
                 'first', 'fixed', 'flat', 'free', 'frequent', 'full', 'general', 'good', 'great', 'grey', 'hanging', 'happy', 'hard', 'healthy', 'high', 'hollow', 'important', 'kind', 'like', 'living',
                 'long', 'married', 'material', 'medical', 'military', 'natural', 'necessary', 'new', 'normal', 'open', 'parallel', 'past', 'physical', 'political', 'poor', 'possible', 'present', 'private', 'probable', 'quick',
                 'quiet', 'ready', 'red', 'regular',
                  'responsible', 'right', 'round', 'same', 'second', 'separate', 'serious', 'sharp', 'smooth', 'sticky', 'stiff', 'straight', 'strong', 'sudden', 'sweet', 'tall', 'thick', 'tight', 'tired', 'true',
                   'violent', 'waiting', 'warm', 'wet', 'wide', 'wise', 'yellow', 'young']


word_array.each do |value|
  Word.create(label: value)
end

word_array2.each do |value|
  Word.create(label: value )
end
