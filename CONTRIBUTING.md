# Contributing

When contributing to any repositories maintained by or falling under the scope
of Kludge Cyber Systems (hereon referred to as KCS), please first discuss the
change you wish to make via issue, email, or any other method with the
maintainer of the repository or lead members of the team the repository falls
under before making a change (this does not apply if you are an external
contributor submitting a pull request for a fork).

Note that we have a code of conduct (see [below][coc]) - please follow it in all
your interactions with the project.

[coc]: CONTRIBUTING.md#code-of-conduct

## Pull Request Process

1. Ensure any dependencies are updated to be as recent as possible, and all
   security issues are audited. Optionally, Depfu will do this for you.
2. Ensure the branch passes all checks (especially lint and tests) and your
   contribution follows all our guidelines.
3. Update the CHANGELOG.md with details of changes and who authored them, except
   in repositories that make use of the automatic release workflow.
4. Increment the version numbers in any example files, README.md, and
   CHANGELOG.md to the new version that this Pull Request would represent.
   The versioning scheme we use is [semantic versioning][semver]. Once again,
   this is not necessary for repositories that use the automatic release
   workflow.
5. You may merge the Pull Request if any of the following are true (and, if you
   cannot merge yourself, you may ask the most recent reviewing contributor to
   do it for you):
   * *a)* The contributions are on `staging` targeted at `master`, the source
   has been tested properly and passes all workflows *AND* has the approval of
   two organization members.
   * *b)* The contribution is on a `dev/*` branch targeted at `staging` and your
   code passes all tests and workflows.
   * *c)* The contribution is from an external branch targeted at `staging` and
   your code passes all tests and workflows.

[semver]: https://semver.org

## Standard of Work

This section is dedicated to laying out general rules for contributing to any
KCS project. If the repository you are working on has its own style guide, it
overrides this one. Else, all of these guidelines apply. For further
information, consult the respective lint configurations.

### Licensing

As per our license of choice, the [MIT license][license], compatibility checking
is largely not necessary. As long as our copyright header is included in
derivative works, and libraries are under compatible licenses (which is most of
them due to the nature of the MIT license), all is fine.

While you may be tempted to use our design philosophy to perpetuate restrictions
on which libraries are used, such as favouring those under similar licenses,
this practice is discouraged - education and discussion is preferred to cutting
usage of valuable and often superlative libraries based solely on their
licensing rather than quality.

[license]: LICENSE

### Formatting

* Tabs for indentation, spaces for formatting.
* UNIX style newlines.
* Trim all trailing whitespace.
* Use semicolons at the end of every statement (but not after function or class
  declarations).
* 80 characters per line of source code.
* Use string formatting instead of concatenation.
* Use the language-specific templating for strings with formatting, and double
  quotes for no formatting.
* Block declaration braces go on the same line as the condition or declarative
  statement. 
* Declare only one variable per declarative statement, rather than *comma
  separating.

### Array and Object Declaration

* Use trailing commas.
* Do not put spaces in keys for objects.
* Do not wrap key names in quotes unless necessary (and if necessary, do it
  consistently on a per-file basis).

### Conditionals

* Use descriptive conditionality variables for complex conditions rather than
  writing their full form.

### Functions

* Keep functions at a minimal length, and create other functions to avoid
  complication.
* Make return statements clear and return as early as possible.
* Use one method per line when chaining, and indent them one level further than
  the original object.

### Comments

* Only use comments for parser / engine runtime statements or to clarify complex
  segments of code.

## Code of Conduct

### Preface, and Our Philosophy

KCS projects follow N26's design and scientific philosophy, adapted and deriving
from the initial UNIX philosophy. As such, this statement is one we hold to our
core: **Irrational prejudice and abstract discrimination has no place in
science.** We are not interested in the abstract personal attributes of our
contributors, merely their skill and reasoning as scientists, and the quality of
their work.

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of personal
background. The only thing that sets us apart as scientists is our ability to
problem-solve, rise to the challenges we are faced with, and work with the
information at hand.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating respect and civility towards other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting accountability for our actions and acknowledging our mistakes
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem harmful within the boundaries of reason.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that do not
follow this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate or upon request.

Note that it is important to us that we are not perpetuators of censorship;
rather, we seek only to establish an environment that reasonably enables
everyone to work comfortably. We vow to not overstep boundaries or punish people
based solely on our personal beliefs, and instead to act with rational and
appropriate response.

### Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

An individual's personal life is not bound to their career image, and we impose
no requirements for their conduct out of our field. However, if one's personal
image directly ties to their professional image, id est if their personal 
platforms are under the same alias they use to work with us, we reserve the 
right to impose necessary sanctions or restrictions in order to protect our
image as a development community from being tarnished by their personal actions.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement. All complaints
will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available [here][version]. A large portion of this document has
been edited, so take care with translations as they are not reflective of this
document, but rather the work from which it derived.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

For answers to common questions about this code of conduct, see the [FAQ][faq]. 
[Translations][translations] are also available.

[homepage]: https://www.contributor-covenant.org
[version]: https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
[faq]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
