---
title: "Prompt Engineering Is Not Dead"
pubDate: "2026-07-17"
category: "AI"
description: "For difficult agentic work, prompt engineering is process design."
---

GPT-5.6 Sol Ultra, 64 agents, a ridiculous number of tokens—and, according to an OpenAI document, a proof of the Cycle Double Cover Conjecture: a graph-theory problem mathematicians had struggled with for roughly 50 years.

I am obviously not qualified to judge the proof. But I do not think the proof is the most interesting part for most of us anyway.

OpenAI also published the [full prompt](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_prompt.pdf) that it says led to the result. It is worth reading, because it is not a normal prompt at all.

It does not say: describe the task, add a few constraints, ask for a nice format.

It tells the model to become the head of a research group. It has up to 64 agents at its disposal and is told to manage the work dynamically: start new lines of attack, prevent everyone from pursuing the same seductive idea, kill approaches that have reached a wall, and organize attacks on any proof that appears to survive.

One small correction to the version of this story I first saw: the prompt does not give the system one hour. It says to spend **at least eight hours** before even thinking about returning or giving up. Apparently solving a 50-year-old conjecture was not supposed to be a quick meeting after all.

## This is what good multi-agent work looks like

A few parts of the prompt felt useful well beyond mathematics.

**Start with genuinely different approaches.** Not twenty agents making minor variations of the same idea. The prompt explicitly asks for different formulations, invariants, reductions, decompositions, flow formulations, transition systems, embeddings, extremal arguments, and computational sanity checks.

**Do not reveal the favourite too early.** If every agent hears that one path looks promising, they will happily spend the next hour polishing the same dead end. Independence is not inefficiency in the beginning; it is insurance against collective tunnel vision.

**Track families of ideas, not just agents.** This is probably my favourite part. Two agents may use different words while doing exactly the same mathematics. The important question is not whether agent 12 is busy. It is whether too much of the research budget has quietly accumulated around one family of ideas.

**Recognise false progress.** A reduction can look elegant and still be useless if it ends with a lemma as difficult as the original conjecture. The prompt says to mark such routes as blocked unless someone brings a genuinely new mechanism, invariant, or construction. More activity is not necessarily more progress.

**Share late, not immediately.** The prompt keeps several incompatible routes alive and asks agents to cross-pollinate only when independent work has exposed each route's real strengths and gaps. This is a better default than throwing every intermediate thought into one shared chat and hoping for emergence.

**Use adversaries, not only helpers.** Candidate proofs must be attacked for hidden assumptions, missing cases, circular reasoning, and technical details that are easy to wave away. In this case the checks are very mathematical—parallel-edge cycles, disconnected graphs, bridges introduced by reductions—but the principle travels well. An agent whose only job is to break the answer is often more valuable than one more agent trying to improve it.

**Demand artifacts.** The prompt wants lemmas, constructions, equations, or counterexamples. It rejects vague optimism and status reports. “This looks promising” is not work. This may be the easiest rule to steal for ordinary agent workflows.

**Define failure in advance.** A partial result, a reduction to another unsolved problem, a proof under stronger assumptions, or verification up to some finite size does not count. Without this, an agent can produce something impressive-looking and still miss the actual task.

## Prompt engineering moved up a level

People sometimes say prompt engineering is dead because modern models no longer need magic wording. For normal tasks, that is mostly true. You can often ask in plain language and get something useful back.

But hard agentic work is a different problem.

Here, the useful prompt engineering is not about finding the exact phrase that makes a model smarter. It is about designing a process: how work is divided, how independent the researchers remain, what information is shared, what counts as progress, who gets to challenge a result, and when a line of thought should lose resources.

The striking thing is how much judgment the prompt delegates to the root model. It is expected to decide whether two approaches are really different, whether a missing lemma is the original problem wearing a hat, whether an idea is exhausted, and which discovery should be passed from one agent to another.

That is much closer to managing a research group than to asking a chatbot a question.

My takeaway is simple:

> Do not just tell agents to collaborate. Define how they should think separately, challenge one another, share information, and decide what deserves more resources.

The magic is not in the wording. It is in the workflow.

Source: [OpenAI's published prompt for “A Proof of the Cycle Double Cover Conjecture”](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_prompt.pdf).
