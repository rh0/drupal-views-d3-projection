<?php

/**
 * D3 Projection style plugin to display coords on an
 * albers projection.
 *
 * @ingroup views_style_plugins
 */
class d3_projection_style_albers extends views_plugin_style_default {
  function options(&$options) {
    parent::options($options);
    $options = array(
      'width' => 720,
      'height' => 500,
    );
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['width'] = array(
      '#type' => 'textfield',
      '#title' => t('Width'),
      '#size' => '30',
      '#description' => t('How wide should the map display be (in px)?'),
      '#default_value' => $this->options['width'],
    );
    $form['height'] = array(
      '#type' => 'textfield',
      '#title' => t('Height'),
      '#size' => '30',
      '#description' => t('How tall should the map display be (in px)?'),
      '#default_value' => $this->options['height'],
    );
  }
}
