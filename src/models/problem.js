import mongoose from "mongoose";
const { Schema } = mongoose;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    tags: {
        type: [String],
        enum: ['array', 'string', 'dynamic programming', 'tree', 'graph', 'math', 'hash table', 'two pointers', 'sliding window',
            'linked list', 'stack', 'queue', 'bit manipulation', 'greedy',
            'sorting', 'recursion', 'backtracking', 'design', 'heap', 'breadth-first search', 'depth-first search', 'union find'],
        default: []
    },
    visibleTestCases: [{
        input: {
            type: String,
            required: true
        }, output: {
            type: String,
            required: true
        }
    }],
    hiddenTestCases: [{
        input: {
            type: String,
            required: true
        }, output: {
            type: String,
            required: true
        }
    }],
    explanation: {
        type: String
    },
    startCode: {
        languages: {
            type: String,
            enum: ['javascript', 'python', 'java', 'c++'],
            default: 'c++'
        },
        initialCode: {
            type: String,
            required: true
        }
    }, problemCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });

const problem = mongoose.model("problem", problemSchema);

export default problem;