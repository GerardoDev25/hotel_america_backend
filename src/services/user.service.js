import { response, request } from 'express';
import Controller from '../controllers';

export const userService = async (req = request, res = response) => {
  try {
    Controller.user();
    res.status(200).json({
      msg: 'get API - user Service',
    });
  } catch (error) {
    console.error('error userServer');
  }
};
