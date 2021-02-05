/**
 * This is a template for an on-change rule. This rule defines what
 * happens when a change is applied to an issue.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/incloud/2020.6/Quick-Start-Guide-Workflows-JS.html
 */

const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'update-count-if-due-has-changed',
  guard: function(ctx) {
    return ctx.issue.fields.isChanged(ctx.DueDate) && ctx.issue.fields.DueDate;
  },
  action: function(ctx) {
    const issue = ctx.issue;

    if (null === issue.fields.DueUpdate || '' === issue.fields.DueUpdate) {
      issue.fields.DueUpdate = 0;
    }

    issue.fields.DueUpdate = issue.fields.DueUpdate + 1;
  },
  requirements: {
    DueUpdate: {
      type: entities.Field.integerType,
      name: 'Due Update',
    },
    DueDate: {
      type: entities.Field.dateType,
      name: "Due Date"
    }
  }
});