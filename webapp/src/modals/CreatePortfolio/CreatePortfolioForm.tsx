import {
  CreatePortfolioInput,
  CreatePortfolioMutation,
  CreatePortfolioMutationVariables,
} from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Icon, Input, Loader, Spacer, Spreader } from 'components/atoms';
import { CREATE_PORTFOLIO } from 'graphql/mutations/portfolios/CreatePortfolio';
import { showErrorToast } from 'helpers/showToast';
import { FC, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { validationSchema } from './CreatePortfolioForm.schema';

interface CreatePortfolioFormProps {
  callback: (data: CreatePortfolioMutation) => void;
}

export const CreatePortfolioForm: FC<CreatePortfolioFormProps> = ({ callback }) => {
  const { t } = useTranslation();

  const modal = useModal();

  const closeModal = modal.remove;

  const defaultValues = {
    name: '',
  } satisfies CreatePortfolioInput;

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    register,
  } = useForm<CreatePortfolioInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [createPortfolio] = useMutation<CreatePortfolioMutation, CreatePortfolioMutationVariables>(
    CREATE_PORTFOLIO,
    {
      onCompleted: data => {
        closeModal();

        callback(data);
      },
      onError: () => {
        showErrorToast(t('service.unknown_error'));
      },
    },
  );

  const onSubmit = async (data: CreatePortfolioInput) => {
    await createPortfolio({
      variables: {
        data,
      },
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        $flex
        $alignItems="flex-end"
      >
        <Input
          placeholder={t('common.input.name.placeholder')}
          flexGrow={1}
          error={errors.name?.message}
          {...register('name')}
        />
      </Box>

      <Spacer />

      <Box
        $flex
        $justifyContent="flex-end"
      >
        <Button
          $color="tertiary"
          onClick={closeModal}
          $flexGrow={1}
          $minWidth="100px"
        >
          {t('common.cancel')}
        </Button>

        <Spreader $spread="0.5" />

        <Button
          disabled={isSubmitting || !isValid || !isDirty}
          $flexGrow={1}
          $minWidth="170px"
          type="submit"
        >
          {isSubmitting && <Loader color="white" />}

          {!isSubmitting && (
            <Fragment>
              {t('add.portfolios.button.add')}

              <Spreader $spread="0.25" />

              <Icon icon={FaPlus} />
            </Fragment>
          )}
        </Button>
      </Box>
    </form>
  );
};
