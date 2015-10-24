# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

Date.parseDate = (input, format) ->
  moment(input,format).toDate()

Date.prototype.dateFormat = (format) ->
  moment(this).format(format)

toggle_address = () ->
  if $("#opportunity_instance_is_online").prop("checked")
    $("#opportunity_instance_online_container").show()
    $("#opportunity_instance_offline_container").hide()
  else
    $("#opportunity_instance_online_container").hide()
    $("#opportunity_instance_offline_container").show()

toggle_hide_reason = () ->
  if $("#opportunity_instance_hide").prop("checked")
    $("#opportunity_instance_hide_reason_container").show()
  else
    $("#opportunity_instance_hide_reason_container").hide()

$(document).on "page:change", ->
  jQuery("#opportunity_instance_registration_deadline").datetimepicker({
    format:'M/D/YYYY h:mm a',
    formatTime:'h:mm a',
    formatDate:'M/D/YYYY'
  })

  $("#opportunity_instance_hide").click (e) ->
    toggle_hide_reason()

  $("#opportunity_instance_is_online").click (e) ->
    toggle_address()

  toggle_address()
  toggle_hide_reason()
