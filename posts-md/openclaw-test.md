title: Agentic AI 
date: February 23, 2026
---
I've been in SF for a week and one thing I realized is that we are in a bubble with agentic AI. 

The truth is that out of the thousands of startups working on agentic AI, there's only going to be a few true winners. 

The ones that win will be the ones that lead with an infrastructure layer. There are many wrappers but the foundational layers are the ones that have a true moat.

I think there's a few layers of tech companies. I'll list a few companies specifically for the pure sake of illustrating it.
0. The world wide web. We wouldn't have much without it. Thanks Tim Berners-Lee. 
1a. Cloud tier: the companies that control the cloud (google, microsoft, aws.) These companies have the biggest moat tbh since the whole internet is built on top of them.
1b. OS level tier: Linux, Windows, MacOS, etc. since these are the layers that allow us to unlock everything below.
2a. OpenAI/Anthropic tier: language models that are built on top of the cloud.
2b. Stripe tier: companies like Stripe, MongoDB, Supabase, Notion, etc. that are built on top of 1, are their own infra layer for whatever respective thing they are working on, and are not reliant on 2a.
3. Cursor/OpenClaw tier: companies that are built on top of language models from 2a. Sure Cursor is working on their own language models too but still is an underdog to the 2a LMs. I think most agentic startups being built are in this tier and competing against each other in red ocean.
4. Startups that are tools for people doing 3 or are a layer on top of 3. I guess you could think of ezspeak.app or AgentBudget or other tools that assist in optimizing 3 or working with 2b.

So I feel like agentic AI would fall around 3. If you are creating an agentic layer that is independent of other layers then it's 3, if it creates a new model and doesn't rely on pre-existing closed-source models then it would be 2, but if it's building on top of OpenClaw as a base then it would be 4.

I think I am interested in 3 right now. I wonder if there's a better approach to an agentic layer aside from OpenClaw. OpenClaw is limited in actions as it's a super-connector but it's not able to operate with browser use the same way we could as a human. Maybe there's a better approach to memory as well. So I am really interested in exploring it. OpenClaw is a big-ass open source project though so it's interesting. I'm sure people are thinking about this in improving OpenClaw.

I think it's so great that OpenClaw is open-source. If it was closed source we'd be moving 4x slower I bet. Peter locked tf in and dropped it and now the whole world is going crazy on it. This is truly the power of open source. People are alarmed. People are trying to build and opportunity is created for people to capitalize on top of OpenClaw and maybe some motivation to compete against it. 

I wonder if there's a way to beat the bot-detection algorithms of the strictest closed source platforms like Meta for example. I feel like a company that would claim to do this would pull a ScaleAI (outsource workers from Kenya or another country and pay them a low wage to do agentic navigation on top of software with human people [automation is just a human doing it for stricter platforms]). TBH i think Instagram is the strongest platform for closed source.

## Idea

What if we have an ecosystem where we have expert agents. 

Going to share some experts I am thinking about bringing to life with an LLM. 
Experts like (with their associated data source, though a well-designed system prompt could do to start)
- Paul Graham (https://www.paulgraham.com/articles.html)
- Abraham Lincoln (https://www.abrahamlincolnonline.org/lincoln/speeches/speechintro.htm)
- Benjamin Graham (Intelligent Investor)
- Sam Altman (https://blog.samaltman.com/)
- Mom Test (https://www.momtestbook.com/)
- Julius Caesar (https://www.gutenberg.org/cache/epub/10657/pg10657.txt)
- Peter Steinberger (openclaw github, https://steipete.me/)
- Lex Fridman (https://lexfridman.com/category/transcripts/)
- Arman Mahjoor (mahjoor.com/blog)
At first, we can create detailed system prompts for speed (instead of creating RAG models, since GPT5.2 is probably trained on these sources anyways.)

Here's the idea

## Cloud server
This all needs to run on the cloud of course. I don't know what we'd use for the cloud infrastructure here yet. Maybe AWS, Hetzner, or something else. At first though it would run localhost. Maybe I'd need Docker as well for containerization....... and then the database shit. But yea for now at first we'd do localhost.

## Internet use layer
There are a few ways we can access the internet.

### Browser layer
If it can be done on the browser. Most websites don't have crazy guardrails against bots unless it's Meta. If it's Meta or other companies, we may want to use a stealthy browser like a) Camoufox - open source anti-detect browser that we could use instead of Chromium, b) undetected-chromedriver, c) puppeteer-extra-plugin-stealth, d) Playwright stealth extension which is Playwright's stealthy base browser profile, e) Browserless (browserless.io). We could find work-arounds like using Buffer and automating on top of buffer. Chromium + Playwright, or Browserbase 

### Mobile layer
If it can't be done on the browser. For example Clash of Clans, Clash Royale, or some other app-based thing. 

### Network layer
In addition to this, we'll need to consider a network/IP layer. AI says 'residential or mobile proxies, geo/ASN rotation, sane request rates, TLS fingerprints that match your claimed browser.'

### Physical layer
When a task just isn't automatable cuz their algorithms are too good. Maybe some things with Meta.

## Tool use layer
How are we going to interact? We are going to make our own custom implementation with a few considerations.

### Deterministic Layer: Vercel Agent Browser
Headless browser automation CLI for AI agents. It is RUST BASED so HELLA FAST, with Node.js fallback. 

## Agent layer 
Here comes the fun part. The agent is in charge of a few things. 

### Memory
We need to create a really good memory layer. This should be one of the best memory layer. We develop it in-house. Should be able to remember long term and short term. We may want to take inspiration from how really good human memory works.

### Experts
Experts are basically the people that agents are based on. For example, Paul Graham, Mom Test, Sam Altman, Benjamin Graham, etc. these people are all experts that we can design. 

### Workflows
We want to create a comprehensive system for workflows. The core idea is that anything you'd normally do on a computer should be captured as a workflow node. Not the tiny sub-steps, but the meaningful operation itself. 

If it were an API call if an API existed, it's a node. For example: 
- linkedin_post(text, media): post on linkedin
- linkedin_messages_read() — view your message inbox
- linkedin_message_reply(thread_id, text) — respond to a message
- twitter_post(text, media)
- github_open_pr(repo, branch, title, body)

The browser becomes the execution layer. The node hides all the messy substeps that are involved with the operation like navigating, clicking, typing, submitting, verifying, etc. and exposes a clean interface identical to what a real API should look like. 

There are three levels to this: 
Level 1 - Workflow: the sequence of operations an agent composes to accomplish a goal. e.g. check_messages -> summarize -> reply_to_top_three
Level 2 - Node: the individual operations, each with typed inputs, a return value, and defined error states. This is where the library lives.
Level 3 - Execution: the actual browser automation steps underneath. The agent never needs to think about this level.

We will then be able to create a node library based off of the past things we've automated and be able to reuse them.

Later on, we could create vendor neutral nodes. General workflow nodes that define operations like logging in and semantically matches them with the platform specific

This is another big thing - how do we create a system that can figure out how to create these nodes? 

The approach I am thinking about is the following: 
- Agent attempts to do it cold once (think Manus.) 
- Before each operation it does, it confirms with the human. Its like 'i'm going to click here. confirm?' or 'i'm going to send this. confirm?' with the option to reject and tell what to do differently similar to how Claude Code works. This keeps the human in the loop as it does the work (without having them do it themselves.)
- After it succeeds, it has the steps figured out and creates the node definition, consisting of: 
-- name: what the operation is called
-- inputs: the typed parameter it needs (text, media, thread ID, etc.)
-- steps: the actual Playwright-style instructionsit executes deterministically on future runs  
-- return value: what it gives back on success (post ID, URL, confirmation, bunch of thread IDs, etc.)
-- error states: these start as educated guesses on run 1 and get real over time through accumulated failures across real executions.
Once a node exists, future runs dont involve the LLM at all, it just executes the steps deterministically: fast and reliable. 

If the UI of the website gets updated and steps break, the AI will kick back in and relearn the steps (with human in the loop again.) It will keep versioning as well (so the older broken ones it has)

Later on, we'll also have a heartbeat system to periodically run each node in the background to verify it's still working (to minimize chance of user having to encounter the broken node.)
- Read only are easy. 
- Write need a sandbox or test account. 

We'll generally keep the workflows open source except for certain ones that are extremely challenging to automate on top of that have protection over it (Meta) to keep defensability, until we create our own browser use layer that developers can use then open source even the hardest ones since the underlying logic of our tool would be what's closed. 

# MOAT
This is an interesting question I need to figure out. What is our moat?

What I notice is that things that are open source are usually things that are hard or not worth keeping a moat or better off given to people to work on to advance than set it as a moat. So for example, stealth infra. This is something that's always changing and there's not really a moat to it because of that. It's not a defensible advantage. 

Some moat ideas: 
- Lesson / workflow representation
-- Becoming the standard for GUI workflows by creating a library of defining vendor neutral ways to describe how to do X in UI Y.
--- for example: logging in, creating a general standard way to automate logging in - vendor neutral - and doing it for the different platforms with their specific backend for them that maps the general to them semantically.  
- Domain specific tuning 
- Accumulated trajectories + feedback. 
-- As people use Agent School, we are able to collect a corpus of real executions. Gets richer and more specialized over time. Competitors would need to not just copy our code but recreate the data and domain expertise.
- Lots of data+trajectories+feedback on when web vs mobile works better, where things break, how to recover
- Data + decision trace moat
- Harder (will get there over time): network-effect / ecosystem moat
- Potential exploration: vertical/domain moat - if we want to go all in on something. Domain edge cases, specific systems, policies, encoded in data and workflows that others dont have. 
- Automation magic on top of the hard ass software (Meta)
